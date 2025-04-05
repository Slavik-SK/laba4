import React, { useState, useCallback } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { 
  CssBaseline, 
  Box, 
  Button, 
  Drawer, 
  IconButton, 
  TextField, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';
import ListItemIcon from '@mui/material/ListItemIcon';

// Redux actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ADD_FEEDBACK = 'ADD_FEEDBACK';
const REGISTER = 'REGISTER';

const login = (userData) => ({ type: LOGIN, payload: userData });
const logout = () => ({ type: LOGOUT });
const addFeedback = (feedback) => ({ type: ADD_FEEDBACK, payload: feedback });
const register = (userData) => ({ type: REGISTER, payload: userData });

// Redux reducer
const initialState = {
  isLoggedIn: false,
  currentUser: null,
  feedbacks: [],
  users: [{ username: 'admin', email: 'admin@example.com', password: 'admin' }]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { 
        ...state, 
        isLoggedIn: true,
        currentUser: action.payload
      };
    case LOGOUT:
      return { 
        ...state, 
        isLoggedIn: false,
        currentUser: null
      };
    case ADD_FEEDBACK:
      return { ...state, feedbacks: [...state.feedbacks, action.payload] };
    case REGISTER:
      return { 
        ...state, 
        users: [...state.users, action.payload],
        isLoggedIn: true,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

// Redux store
const store = createStore(rootReducer);

// Custom hook for login state
const useLoginState = () => {
  return useSelector(state => state.isLoggedIn);
};

const labWorks = [
  { id: 1, title: 'Лабораторная работа 1: ', content: 'Реализовать скрипт, который уведомит о полной загрузке страницы. Реализовать кнопку счетчик, которая будет увеличивать счетчик на "1" и вывести его значение на страницу (button onclick).    Реализовать кнопку счетчик, которая будет уменьшать счетчик на "1" реализовать с помощью listener click. Реализовать форму аутентификации пользователя (<form>). Реализовать скрипт очистки данных формы. Реализовать скрипт отправки данных формы с помощью listener submit. Без отправки на сервер провести валидацию введенных данных, если login=="admin" & pass=="admin" вывести сообщение об успехе, иначе сообщение о неуспехе. Реализовать скрипт сохранения учетных данных и автоподстановку оных с помощью localStorage' },
  { id: 2, title: 'Лабораторная работа 2:', content: 'Создать "Hello World" приложение на основе React. Для создания можно использовать create-react-app или vite. Реализовать компонент кнопку, контейнер и использовать их на странице. Реализовать шаблон страницы и разместить на нем компоненты навигации. Разместить проект в репозиторий в github. Прикрепить текстовый файл с сылкой на проект' },
  { id: 3, title: 'Лабораторная работа 3:', content: 'Продолжаем задание "Реализовать шаблон страницы и разместить на нем компоненты навигации" (Можно использовать готовые библиотеки Mui/Bootstrap и тд). Реализуем компоненты Header, Footer, Menu и Content. В меню выводим список лабораторных работ. В Content  выводим содержимое лабораторной работы. Разместить проект в репозиторий в github. Прикрепить текстовый файл с сылкой на проект' },
];

const AuthForm = ({ switchToRegister }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');
    
    const user = store.getState().users.find(
      u => u.username === username && u.password === password
    );
    
    if (user) {
      dispatch(login(user));
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      setError('Неверные учетные данные');
    }
  }, [username, password, dispatch]);

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', my: 4 }}>
      <Typography variant="h5" gutterBottom>Авторизация</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Логин"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Войти
        </Button>
        <Button 
          fullWidth 
          sx={{ mt: 1 }} 
          onClick={switchToRegister}
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};

const RegistrationForm = ({ switchToLogin }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Введите имя пользователя';
    if (!formData.email.trim()) newErrors.email = 'Введите email';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Введите корректный email';
    if (!formData.password) newErrors.password = 'Введите пароль';
    else if (formData.password.length < 6) newErrors.password = 'Пароль должен быть не менее 6 символов';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    // Проверка на существующего пользователя
    const userExists = store.getState().users.some(
      u => u.username === formData.username || u.email === formData.email
    );
    if (userExists) newErrors.username = 'Пользователь уже существует';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };
      dispatch(register(userData));
      localStorage.setItem('isLoggedIn', 'true');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', my: 4 }}>
      <Typography variant="h5" gutterBottom>Регистрация</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя пользователя"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <TextField
          label="Пароль"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          required
        />
        <TextField
          label="Подтвердите пароль"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Зарегистрироваться
        </Button>
        <Button 
          fullWidth 
          sx={{ mt: 1 }} 
          onClick={switchToLogin}
        >
          Уже есть аккаунт? Войти
        </Button>
      </form>
    </Paper>
  );
};

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      dispatch(addFeedback({
        id: Date.now(),
        text: feedbackText,
        date: new Date().toLocaleString(),
        author: currentUser?.username || 'Аноним'
      }));
      setFeedbackText('');
    }
  }, [feedbackText, dispatch, currentUser]);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Оставить отзыв</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Ваш отзыв"
          multiline
          rows={4}
          fullWidth
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Отправить
        </Button>
      </form>
    </Paper>
  );
};

const FeedbackList = () => {
  const feedbacks = useSelector(state => state.feedbacks);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Отзывы</Typography>
      {feedbacks.length > 0 ? (
        <List>
          {feedbacks.map(feedback => (
            <ListItem key={feedback.id} divider>
              <ListItemText
                primary={feedback.text}
                secondary={`${feedback.author}, ${feedback.date}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>Пока нет отзывов</Typography>
      )}
    </Paper>
  );
};

const FeedbackPage = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <FeedbackForm />
      <FeedbackList />
    </Box>
  );
};

const AppContent = () => {
    const { mode, toggleTheme } = useTheme(); 
    const theme = createTheme({
      palette: {
        mode: mode,
      },
    });
  
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    
    // Состояние для меню пользователя
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
  
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(open);
    };
  
    const handleLogout = () => {
      dispatch(logout());
      localStorage.removeItem('isLoggedIn');
      handleMenuClose();
    };
  
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const drawer = () => (
      <Box sx={{ width: 250 }} role="presentation">
        <Typography variant="h6" sx={{ p: 2 }}>
          {currentUser?.username || 'Гость'}
        </Typography>
        {labWorks.map((lab) => (
          <Link key={lab.id} to={`/lab/${lab.id}`} style={{ textDecoration: 'none' }}>
            <Button onClick={() => setOpen(false)}>{lab.title}</Button>
          </Link>
        ))}
        <Link to="/feedback" style={{ textDecoration: 'none' }}>
          <Button onClick={() => setOpen(false)}>Обратная связь</Button>
        </Link>
      </Box>
    );
  
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header title="React Labs">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button 
                onClick={toggleTheme}
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                {mode === 'light' ? 'Тёмная тема' : 'Светлая тема'}
              </Button>
              
              {currentUser && (
                <>
                  <Tooltip title="Профиль">
                    <IconButton
                      onClick={handleMenuClick}
                      size="small"
                      sx={{ ml: 1 }}
                      aria-controls={openMenu ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? 'true' : undefined}
                    >
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32,
                          bgcolor: 'secondary.main'
                        }}
                      >
                        {currentUser.username.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  
                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1.5,
                        minWidth: 180,
                      },
                    }}
                    transformOrigin={{
                      horizontal: 'right',
                      vertical: 'top',
                    }}
                    anchorOrigin={{
                      horizontal: 'right',
                      vertical: 'bottom',
                    }}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      Профиль
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      Выйти
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Header>
  
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={toggleDrawer(true)} 
            aria-label="menu"
            sx={{ 
              position: 'fixed', 
              left: 16, 
              top: 16,
              zIndex: 1200
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            {drawer()}
          </Drawer>
          
          <Box 
            component="main"
            sx={{ 
              flexGrow: 1, 
              p: 3,
              pt: 8
            }}
          >
            <Routes>
              {labWorks.map((lab) => (
                <Route key={lab.id} path={`/lab/${lab.id}`} element={<Content lab={lab} />} />
              ))}
              <Route path="/feedback" element={<FeedbackPage />} />
            </Routes>
          </Box>
          
          <Footer text="© 2025 React Labs" />
        </Box>
      </MuiThemeProvider>
    );
  };

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <AuthForm switchToRegister={() => setIsLogin(false)} />
  ) : (
    <RegistrationForm switchToLogin={() => setIsLogin(true)} />
  );
};

const RootApp = () => {
  const isLoggedIn = useLoginState();

  return isLoggedIn ? <AppContent /> : <AuthPage />;
};

const Root = () => (
  <Provider store={store}>
    <ThemeProvider>
      <Router>
        <RootApp />
      </Router>
    </ThemeProvider>
  </Provider>
);

export default Root;