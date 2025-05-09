import { useEffect, useRef, useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Chip, ClickAwayListener, Divider, List, ListItemButton,
  ListItemIcon, ListItemText, Paper, Popper, Stack, Typography, Box
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useConfig from 'hooks/useConfig';
import { Button, OutlinedInput } from '@mui/material';
import { useUser } from '../../../../contexts/UserContext';
import User1 from 'assets/images/users/user-round.svg';
import { IconSettings } from '@tabler/icons-react';
import { IconEdit, IconX, IconCheck, IconLogout } from '@tabler/icons-react';
import { api_url } from '../../../../services/config';
import LogoutModal from '../../../../components/Alert/LogoutAlert';
import axios from 'axios';
import { errorToast, successToast } from '../../../../outils/ToastConfig';

// ==============================|| PROFILE MENU ||============================== //

export default function ProfileSection() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { borderRadius } = useConfig();
  const { logout, user } = useUser(); // Utilisation du contexte utilisateur
  const [selectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    password: '',
  });

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);



  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || '',
        email: user.email || '',
        telephone: user.telephone || '',
        adresse: user.adresse || ''
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
    if (editMode && user) {
      // Reset si on annule
      setFormData({
        nom: user.nom || '',
        email: user.email || '',
        telephone: user.telephone || '',
        adresse: user.adresse || '',
        password: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${api_url}/users/${user.id}`,
        {
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          adresse: formData.adresse,
          password: formData.password
        }
      );
      successToast(response.data.message);      
      setEditMode(false);
    } catch (error) {
      const message = error.response?.data?.message || 'Une erreur s’est produite.';
      errorToast(message);
      console.error('Erreur lors de la mise à jour :', error.response?.data || error.message);
    }
  };

  const deconnexion = async () => {
    logout();
    navigate('/login', { replace: true }); // empêche de revenir en arrière avec le bouton "retour"
  }

  const closeConfirm = () => setShowConfirm(false);


  return (
    <>
      <Chip
        sx={{
          ml: 2,
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={User1}
            alt="user-images"
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="24px" />}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
        aria-label="user-account"
      />
      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 14]
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                    <Box sx={{ p: 2, pb: 0 }}>
                      <Stack>
                        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                          <Typography variant="h4">Bonjour,</Typography>
                          <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                            {user?.nom || 'Invité'}
                          </Typography>
                        </Stack>
                        <Typography variant="subtitle2">
                          Role : {user.role}
                        </Typography>
                      </Stack>
                      <Divider />
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        py: 0,
                        height: '100%',
                        maxHeight: 'calc(100vh - 250px)',
                        overflowX: 'hidden',
                        '&::-webkit-scrollbar': { width: 5 }
                      }}
                    >
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          borderRadius: `${borderRadius}px`,
                          '& .MuiListItemButton-root': { mt: 0.5 }
                        }}
                      >
                        <Stack spacing={2} sx={{ p: 2 }}>
                          <Typography variant="h5">Informations Personnelles</Typography>
                          <Divider />
                          <OutlinedInput
                            name="nom"
                            value={formData.nom}
                            disabled={!editMode}
                            onChange={handleChange}
                            fullWidth
                            placeholder="Nom"
                            sx={{
                              height: 40,
                              '& input': {
                                padding: '8px 14px' // contrôle le padding interne
                              }
                            }}
                          />
                          <OutlinedInput
                            name="email"
                            value={formData.email}
                            disabled={!editMode}
                            onChange={handleChange}
                            fullWidth
                            placeholder="Email"
                            sx={{
                              height: 40,
                              '& input': {
                                padding: '8px 14px' // contrôle le padding interne
                              }
                            }}
                          />
                          {editMode && (
                            <OutlinedInput
                              name="password"
                              value={formData.password}
                              disabled={!editMode}
                              onChange={handleChange}
                              fullWidth
                              placeholder="mot de passe"
                              sx={{
                                height: 40,
                                '& input': {
                                  padding: '8px 14px' // contrôle le padding interne
                                }
                              }}
                            />
                          )}
                          <OutlinedInput
                            name="telephone"
                            value={formData.telephone}
                            disabled={!editMode}
                            onChange={handleChange}
                            fullWidth
                            placeholder="Téléphone"
                            sx={{
                              height: 40,
                              '& input': {
                                padding: '8px 14px' // contrôle le padding interne
                              }
                            }}
                          />
                          <OutlinedInput
                            name="adresse"
                            value={formData.adresse}
                            disabled={!editMode}
                            onChange={handleChange}
                            fullWidth
                            placeholder="Adresse"
                            sx={{
                              height: 40,
                              '& input': {
                                padding: '8px 14px' // contrôle le padding interne
                              }
                            }}
                          />
                          {!editMode ? (
                            <Stack>
                              <Button
                                sx={{ borderRadius: `${borderRadius}px` }}
                                variant="contained"
                                startIcon={<IconEdit />}
                                onClick={handleEditToggle}
                              >
                                Modifier
                              </Button>
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={2}>
                              <Button
                                sx={{ borderRadius: `${borderRadius}px` }}
                                variant="contained"
                                color="inherit"
                                startIcon={<IconX />}
                                fullWidth
                                onClick={handleEditToggle}
                              >
                                Annuler
                              </Button>
                              <Button
                                sx={{ borderRadius: `${borderRadius}px` }}
                                variant="outlined"
                                color="success"
                                startIcon={<IconCheck />}
                                fullWidth
                                onClick={handleSave}
                              >
                                Enregistrer
                              </Button>
                            </Stack>
                          )}
                        </Stack>
                        {!editMode && (
                          <ListItemButton
                            onClick={() => setShowConfirm(true)}
                            sx={{
                              borderRadius: `${borderRadius}px`,
                              bgcolor: 'error.main',
                              '&:hover': {
                                bgcolor: 'error.dark'
                              },
                              color: '#fff',
                              width: '90%',
                              height: 35, // hauteur réduite
                              mx: 'auto', // centré horizontalement
                              px: 2, // padding horizontal réduit
                              paddingLeft: 8
                            }}
                            selected={selectedIndex === 4}
                          >
                            <ListItemIcon sx={{ color: '#fff', minWidth: 32 }}>
                              <IconLogout stroke={1.5} size="20px" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
                                  Déconnexion
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        )}
                      </List>
                    </Box>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
      <LogoutModal show={showConfirm} ModalClose={closeConfirm} handleConfirm={deconnexion} />
    </>
  );
}
