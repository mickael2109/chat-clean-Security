
export async function decryptMessage(encryptedBase64: string, privateKey: string): Promise<string> {
  try {
    // Vérifier la validité du base64
    if (!encryptedBase64 || typeof encryptedBase64 !== "string") {
      throw new Error("Message chiffré invalide ou vide");
    }
    let binaryData;
    try {
      binaryData = atob(encryptedBase64);
    } catch {
      throw new Error("Le message chiffré n'est pas une chaîne base64 valide");
    }

    // Vérifier la clé privée
    if (!privateKey || !privateKey.includes("BEGIN PRIVATE KEY")) {
      throw new Error("Clé privée invalide ou manquante");
    }

    // Importer la clé privée
    const privateKeyObj = await importPrivateKey(privateKey);

    // Convertir le message base64 en ArrayBuffer
    const encryptedBuffer = Uint8Array.from(binaryData, c => c.charCodeAt(0)).buffer;
    
    // Déchiffrement
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      privateKeyObj,
      encryptedBuffer
    );
    

    // Décoder le résultat en texte
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error("Erreur lors du déchiffrement :", error);
    throw new Error(`Échec du déchiffrement : ${error}`);
  }
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  try {
    const pemContents = pem
      .replace(/-----BEGIN PRIVATE KEY-----/, '')
      .replace(/-----END PRIVATE KEY-----/, '')
      .replace(/\s+/g, '');

    if (!pemContents) {
      throw new Error("Clé privée vide après nettoyage");
    }

    let binaryDer;
    try {
      binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
    } catch {
      throw new Error("Clé privée base64 invalide");
    }

    const key = await window.crypto.subtle.importKey(
      "pkcs8",
      binaryDer.buffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-1", // Changement de SHA-256 à SHA-1
      },
      false,
      ["decrypt"]
    );
    return key;
  } catch (error) {
    throw new Error(`Erreur lors de l'importation de la clé privée : ${error}`);
  }
}