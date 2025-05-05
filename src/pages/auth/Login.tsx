import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEnvelope, FaFacebook, FaGoogle, FaLinkedinIn, FaLock, FaTwitter } from 'react-icons/fa';
import { SweetAlert } from "../../utils/sweetAlert";
import { loginInterface } from "../../types/UserInterface";
import Cookies from 'js-cookie';
import { authRepository } from "../../application/repository/authRepository";
import { useAppDispatch } from "../../redux/store";
import { getClientSender } from "../../domain/usecases/client/getClient";



const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // État pour la connexion, typé avec loginInterface
  const [loginData, setLoginData] = useState<loginInterface>({
    email: '',
    password: ''
  });


  // Gestion de la soumission du formulaire de connexion
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await authRepository.loginRepo(loginData.email, loginData.password);
      const status = result.success
      
      if (!status) {
        SweetAlert.errorPage("Votre email ou mdp est incorrect");
      } else {
        dispatch(getClientSender(loginData.email, loginData.password));
        const token = result.token

        Cookies.set('___chat-token', token, { expires: 1, secure: false, sameSite: 'Strict' });
        navigate("/admin");
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
          {/* Formulaire de connexion */}
          <form onSubmit={handleLogin} className="sign-in-form flex flex-col gap-4">
            <h2 className="title text-2xl font-bold">S'authentifier</h2>
            <div className="input-field flex items-center gap-3 bg-base-200 rounded-lg px-3">
              <FaEnvelope className="text-lg" />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                value={loginData.email}
                className="input w-full bg-transparent"
                required
              />
            </div>
            <div className="input-field flex items-center gap-3 bg-base-200 rounded-lg px-3">
              <FaLock className="text-lg" />
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                value={loginData.password}
                className="input w-full bg-transparent"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary solid">
              Se connecter
            </button>
            <NavLink to="/register" className="social-text text-center">S'inscrire sur chat'nay</NavLink>
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

          {/* Formulaire d'inscription */}
          {/* <form onSubmit={handleCreate} className="sign-up-form flex flex-col gap-4">
            <h2 className="title text-2xl font-bold">S'inscrire</h2>
            <div className="input-field flex items-center gap-3 bg-base-200 rounded-lg px-3">
              <FaEnvelope className="text-lg" />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setCreate({ ...create, email: e.target.value })}
                value={create.email}
                className="input w-full bg-transparent"
                required
              />
            </div>
            <div className="input-field flex items-center gap-3 bg-base-200 rounded-lg px-3">
              <FaLock className="text-lg" />
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => setCreate({ ...create, password: e.target.value })}
                value={create.password}
                className="input w-full bg-transparent"
                required
              />
            </div>
            <div className="input-field flex items-center gap-3 bg-base-200 rounded-lg px-3">
              <FaLock className="text-lg" />
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                onChange={(e) => setCreate({ ...create, confirm_mdp: e.target.value })}
                value={create.confirm_mdp}
                className="input w-full bg-transparent"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary solid">
              S'inscrire
            </button>
            <p className="social-text text-center">Ou s'inscrire avec les plateformes sociales</p>
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
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Login;