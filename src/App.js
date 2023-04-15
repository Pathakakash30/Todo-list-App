import logo from "./logo.svg";
import "./App.css";
import Main from "./main";
import { ConfigProvider } from 'antd';
import en_GB from 'antd/locale/en_GB';

function App() {
  return (
    <ConfigProvider locale={en_GB}>
      <div className="App">
        <Main />
      </div>
    </ConfigProvider>
  );
}



export default App;
