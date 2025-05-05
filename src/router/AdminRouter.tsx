import {Routes, Route} from 'react-router-dom'
import Layout from '../pages/page/Layout';
import Message from '../pages/page/Message';
import Dash from '../pages/page/Dash';
import MyComponent from '../ui/components/MyComponent';

const AdminRouter = () => {
    return (
        <Routes>
          <Route element={<Layout/>}>
            <Route index element={<Dash/>}/>
            <Route path=':id' element={<Message/>}/>
            <Route path='/test' element={<MyComponent/>}/>

          </Route>
        </Routes>
    );
}

export default AdminRouter;
