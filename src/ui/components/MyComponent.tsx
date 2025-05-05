import { decryptMessage } from "../../application/cryptage/decrypt";

const MyComponent = () => {
  const handleDecrypt = async () => {
    const encryptedBase64 = "hnvWtScuW80+kLrXNb3i9DnbFAOKhHA4IEOII7VWzPN9iL2FwWqynNMbrflIEuPnP9WT9BS0WzREMyzyMbz62gyYhagDvvEQDWCRylc9Wo/xTVSfJW9g/ijx9/qezndUj+rWKt48Q0yfbZP8uMv4UkhblcfknEVnawPIDYUHw0keVREXrzHZAp7YoUtdiDaSKwmjVZopxIk7ZdA1mN+Y3sSwPH6837CZ1hA+BVnnUWDZv1Bfq1K2pmykvjC9yui5RyuFecP+u/Hft9qyfDBe+oIKSneYrX8x/kZI9JnioLJX1uJZWbxdycchmkQQQLAggv/zTW59gYg2r4P6VhQ8xQ==";
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDqsTt5Dv3r3ORB
9JZcHYYafcEAdCKr60T2YKgETiA5YSnI32S4zmjdZxWnkph/9Jr5ZE+x/eAfZDlb
hQphRxDofdm0EPZVkwFXEJJS0XaoThsmo8LtPzEBSQQd/wGf1akI4D8n7OZmd2MQ
IYAF1EkDQi6atOK9CPLwg+TJn5/Z/HmW7bxJg7wvfvPrerFhUdYSA3kHN2z+bNRI
LnMPYzJiuRFDRTE8OadezhkQYIdlkAf1JBr1BJYDIb/xlw9fyuLf0bktpMDAXxYK
qzsQi/913+VWQ9cNlN6FUuQZvrRaqpk/mX5JRSZOwbQ9K+Gfe1UK6sUxFN2A1deH
hp9lIcBRAgMBAAECggEAGs+6ip7y1UI79Wj60HUy/83EAchCub879qWeLDe8qLF3
85HJ0O8Lvddr+uPddii8l6clD6GAPDXX86OkRu62eMj/2PljGu2bZpXnEX0KgDnE
Ekr9Ftt0PsBXrxGV3uuqzu/HZ0lCHQygjZQ2KvRQjwW9i0EE8jGWh3GZ7orE2UMt
ohXR0tL5REV0X7hIJGqBJ2cZcAOxMLed31jYZ/gRDGW+rQZLkZlhidceTkpecli+
Ldd5/llEYP1pGWD6krBvLCaErAaifTV5EnDomrZUwCMvqN0MtJpfRPGmZMmRamCb
aLKkgs6EfkGzLVhEMYyJLoi19Tx/RcF4zGxe3UPIzQKBgQD4oxrGDewFXDS2B32P
UF+vJTXeS5kMe7LlHzSgLUFFVfB52CyIyihrn2NOFR2rkhLNfPSPuIItmF1zNcAw
TwPfb+/2dUsIg+COTBmJP1wWBCA8leYKgHP/YbcfMSOCB55cnirAjNDFd65nWto9
bQFqBeiHcrIc8imHirZ/I18jGwKBgQDxpGnSncQ61aio3443jKq0R8fvFQci2O61
Gi4c2ShsBn/K/RmG1n4h0nljXSprg16S597a4Hz7BrE3nCPf7oQjLpWnanMBLKoU
/zpdehnOwhG6diTq0tguuomRMcebF6eMA/CQNd8eCReyQ3qnc6gWVtXXpXpco0zL
JyM9Bnt1AwKBgQDbXxU9T4VByXPcc0luDA0QPDWGF49Gu1FA5MKK3MLtCQEuj/Pj
EPKO2kdE2k6eVThvw2MH91QsJHW3M+KI/P4+wsWm3yA/uBOFmVEijhuSdTt4GQ2p
kGJIHg/y3mkkzdIEh6zSzKtavtjK6hcKAUYxJFtgPms2LNdFdrbEABJtpwKBgEeE
1wFMSpjzReD9kbUlQBztpeJAQgVxWW1mm0FUkJ8waUBmGtkKwPg3uE/NclGx5xrp
386+ZJ9Tgr4ny4JqsNdM4WRUoEc3tftS8y5ZhivoyqB6eUC7ONrTwQWlSyO/I4rQ
W7IDD89u94F+cV4AYD6EYvRZeNbUSlVSdx6HvaCLAoGAAcdr5SoEAfBG9MFmzWli
9gKWUJzSd3PWaB0xm6WU0eUfbi7deM0qjtnD3SI/do5ZQ7w/5MLcSQ5FUb89U8Vc
v7ffh8B3ocSB29COVVCpdPNAelcjrw/4RAb7nhBJAtZJTJiTh55fBX+uBRVeJnlt
pVcY2Joa8QMM5haKU3S5veY=
-----END PRIVATE KEY-----`;

    try {
      const decrypted = await decryptMessage(encryptedBase64, privateKey);
      console.log("Message déchiffré :", decrypted);
    } catch (error) {
      console.error("Échec du déchiffrement :", error);
    }
  };

  return <button onClick={handleDecrypt}>Déchiffrer</button>;
};

export default MyComponent;