import React, { useState } from 'react';
 import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
 import { CssBaseline, Box, Button, Drawer, IconButton } from '@mui/material';
 import MenuIcon from '@mui/icons-material/Menu';
 import Header from './components/Header';
 import Footer from './components/Footer';
 import Content from './components/Content';
 import { ThemeProvider, useTheme } from './components/ThemeContext'; 
 import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
 
 // Redux imports
 import { Provider, useDispatch, useSelector } from 'react-redux';
 import { createStore } from 'redux';
 //сделать хранение content многострочным
 const labWorks = [
     { id: 1, title: 'Лабораторная работа 1: ', content: 'Реализовать скрипт, который уведомит о полной загрузке страницы. Реализовать кнопку счетчик, которая будет увеличивать счетчик на "1" и вывести его значение на страницу (button onclick).    Реализовать кнопку счетчик, которая будет уменьшать счетчик на "1" реализовать с помощью listener click. Реализовать форму аутентификации пользователя (<form>). Реализовать скрипт очистки данных формы. Реализовать скрипт отправки данных формы с помощью listener submit. Без отправки на сервер провести валидацию введенных данных, если login=="admin" & pass=="admin" вывести сообщение об успехе, иначе сообщение о неуспехе. Реализовать скрипт сохранения учетных данных и автоподстановку оных с помощью localStorage' },
     { id: 2, title: 'Лабораторная работа 2:', content: 'Создать "Hello World" приложение на основе React. Для создания можно использовать create-react-app или vite. Реализовать компонент кнопку, контейнер и использовать их на странице. Реализовать шаблон страницы и разместить на нем компоненты навигации. Разместить проект в репозиторий в github. Прикрепить текстовый файл с сылкой на проект' },
     { id: 3, title: 'Лабораторная работа 3:', content: 'Продолжаем задание "Реализовать шаблон страницы и разместить на нем компоненты навигации" (Можно использовать готовые библиотеки Mui/Bootstrap и тд). Реализуем компоненты Header, Footer, Menu и Content. В меню выводим список лабораторных работ. В Content  выводим содержимое лабораторной работы. Разместить проект в репозиторий в github. Прикрепить текстовый файл с сылкой на проект' },
   ];
 
 
 const INCREMENT = 'INCREMENT';
 const DECREMENT = 'DECREMENT';
 
 const increment = () => {
   console.log("increment action dispatched");
   return { type: INCREMENT };
 };
 
 const decrement = () => {
   console.log("decrement action dispatched");
   return { type: DECREMENT };
 };
 
 const counterReducer = (state = 0, action) => {
   console.log("reducer called with state", state, "and action", action);
   switch (action.type) {
     case INCREMENT:
       return state + 1;
     case DECREMENT:
       return state - 1;
     default:
       return state;
   }
 };
 
 // Redux store
 const store = createStore(counterReducer);
 
 const App = () => {
     const { mode, toggleTheme } = useTheme(); 
     const theme = createTheme({
         palette: {
             mode: mode,
         },
     });
 
     const [open, setOpen] = useState(false);
 
     const toggleDrawer = (open) => (event) => {
         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
             return;
         }
         setOpen(open);
     };
 //что-то сделать с drawer типо =()=>
     const drawer = () => (
         <Box
             sx={{ width: 250 }}
             role="presentation"
             onClick={toggleDrawer(false)}
             onKeyDown={toggleDrawer(false)}
         >
             {labWorks.map((lab) => (                <Link key={lab.id} to={`/lab/${lab.id}`} style={{ textDecoration: 'none' }}>
                     <Button onClick={() => setOpen(false)}>
                         {lab.title}
                     </Button>
                 </Link>
             ))}
         </Box>
     );
 
     return (
         <MuiThemeProvider theme={theme}>
             <CssBaseline />
             <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                 <Header title="React Labs" />
                 <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
                     <MenuIcon />
                 </IconButton>
                 <Button onClick={toggleTheme}>Toggle Theme</Button>
                 <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                     {drawer()}
                 </Drawer>
                 <Box sx={{ display: 'flex', flexGrow: 1, p: 2 }}>
                     <Routes>
                         {labWorks.map((lab) => (
                             <Route key={lab.id} path={`/lab/${lab.id}`} element={<Content lab={lab} />} />
                         ))}
                     </Routes>
                     <Counter /> {/* Render the counter component */}
                 </Box>
                 <Footer text="© 2025 React Labs" />
             </Box>
         </MuiThemeProvider>
     );
 };
 
 const Counter = () => {
     const count = useSelector((state) => state); 
     const dispatch = useDispatch(); 
 
     return (
         <div>
             <p>Counter: {count}</p>
             <Button onClick={() => dispatch(increment())}>Increment</Button>
             <Button onClick={() => dispatch(decrement())}>Decrement</Button>
         </div>
     );
 };
 
 
 const Root = () => (
     <Provider store={store}> {/* Provide the Redux store */}
         <ThemeProvider>
             <Router>
                 <App />
             </Router>
         </ThemeProvider>
     </Provider>
 );
 
 export default Root;