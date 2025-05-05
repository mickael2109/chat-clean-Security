import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaFacebook, FaGoogle, FaLinkedinIn, FaLock, FaTwitter, FaUser } from 'react-icons/fa';
import { SweetAlert } from "../../utils/sweetAlert";
import { registerInterface } from "../../types/UserInterface";
import Cookies from 'js-cookie';
import { authRepository } from "../../application/repository/authRepository";



const Register = () => {

  // État pour la connexion, typé avec loginInterface
  const [registerData, setRegisterData] = useState<registerInterface>({
    username:'',
    email: '',
    password: ''
  });

  const [confirmPass, setConfirmPass] = useState("")


  // Gestion de la soumission du formulaire de connexion
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      if(confirmPass === registerData.password){
        const result = await authRepository.registerRepo(registerData.username, registerData.email, registerData.password);
        const status = result.success
        
        
        if (!status) {
          SweetAlert.errorPage("Erreur lors du création du compte");
        } else {
          const privateKey = result.privateKey
  
          Cookies.set('___chat-key', privateKey, { expires: 1, secure: false, sameSite: 'Strict' });
          SweetAlert.sucessInfo("Votre compte est bien enregistré");
          
        }
      }else{
          SweetAlert.errorPage("Veuillez bien confimer votre mot de passe");
      }
      
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        console.log("error : ",error.response.data.message);
        
      SweetAlert.errorPage(error.response.data.message);
    }
  };

 
  return (
    <div className={`container-login sign-up-mode`}>
      <div className="forms-container flex flex-row justify-center items-center h-screen">
        <div className="signin-signup w-[600px]">
      
          {/* Formulaire d'inscription */}
          <form onSubmit={handleRegister} className="sign-up-form flex flex-col gap-4">
            <h2 className="title text-2xl font-bold">S'inscrire</h2>
            <div className="input-field flex items-center gap-3 bg-base-200 rounded-lg px-3">
              <FaUser className="text-lg" />
              <input
                type="text"
                placeholder="Votre pseudo"
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                value={registerData.username}
                className="input w-full bg-transparent"
                required
              />
            </div>
            <div className="input-field flex items-center gap-3 bg-base-200 rounded-lg px-3">
              <FaEnvelope className="text-lg" />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                value={registerData.email}
                className="input w-full bg-transparent"
                required
              />
            </div>
            <div className="input-field flex items-center gap-3 bg-base-200 rounded-lg px-3">
              <FaLock className="text-lg" />
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                value={registerData.password}
                className="input w-full bg-transparent"
                required
              />
            </div>
            <div className="input-field flex items-center gap-3 bg-base-200 rounded-lg px-3">
              <FaLock className="text-lg" />
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                onChange={(e) => setConfirmPass(e.target.value )}
                value={confirmPass}
                className="input w-full bg-transparent"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary solid">
              S'inscrire
            </button>
            <NavLink to="/" className="social-text text-center">Se connecter</NavLink>
            <div className="social-media flex justify-center gap-4">
              <NavLink to="#" className="social-icon btn btn-ghost btn-circle">
                <FaFacebook />
              </NavLink>
              <NavLink to="#" className="social-icon btn btn-ghost btn-circle">
                <FaTwitter />
              </NavLink>
              <NavLink to="#" className="social-icon btn btn-ghost btn-circle">
                <FaGoogle />
              </NavLink>
              <NavLink to="#" className="social-icon btn btn-ghost btn-circle">
                <FaLinkedinIn />
              </NavLink>
            </div>
          </form>
        </div>
      </div>

    
    </div>
  );
};

export default Register;