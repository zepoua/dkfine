import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { successToast, errorToast } from '../../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { api_url, getCsrfCookie } from '../../../services/config';
import { useUser } from '../../../contexts/UserContext';

// ===============================|| JWT - LOGIN ||=============================== //

export default function AuthLogin() {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const [enable, setEnable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useUser(); // Utilisation du contexte utilisateur
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: '',
    password: ''
  });


  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true }); // empêche de revenir en arrière avec le bouton "retour"
    }
  }, [user, navigate]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // empêcher le rechargement de la page

    if (!form.nom || !form.password) {
      errorToast('Veuillez remplir tous les champs.');
      return;
    }
    try {
      setEnable(true); // désactiver le bouton pendant la soumission
      await getCsrfCookie(); // obtenir le cookie CSRF
      const response = await axios.post(`${api_url}/login`, {
        nom: form.nom,
        password: form.password
      })
      login(response.data.user); // Enregistrer l'utilisateur dans le contexte
      navigate('/dashboard', { replace: true }); // empêche de revenir en arrière avec le bouton "retour"
      successToast('Connexion réussie !');
    } catch (error) {
      const message = error.response?.data?.message || 'Une erreur s’est produite.';
      errorToast(message);
    } finally {
      setEnable(false); // Réactive le bouton
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate autoComplete="off">
      <FormControl fullWidth sx={{ ...theme.typography.customInput }} required>
        <InputLabel htmlFor="outlined-adornment-nom-login">Nom d'utilisateur</InputLabel>
        <OutlinedInput id="outlined-adornment-nom-login" type="text" value={form.nom} name="nom" onChange={handleChange} />
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }} required>
        <InputLabel htmlFor="outlined-adornment-password-login">Mot de passe</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={handleChange}
          name="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputProps={{}}
          label="Password"
        />
      </FormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Me garder connecté"
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="secondary" fullWidth size="large" type="submit" variant="contained" disabled={enable}>
            Se connecter
          </Button>
        </AnimateButton>
      </Box>
      <ToastContainer />
    </Form>

  );
}
