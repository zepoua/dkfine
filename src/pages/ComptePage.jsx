import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { successToast, errorToast } from '../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';

function MemberPage(){
    return (
        <div className="p-4 w-full">
          <h2 className="mb-4">Gestion des Comptes</h2>
          <Button variant="primary" className="mb-3">
            <FaPlus /> Nouveau Membre
          </Button>
        </div>
      );

}
export default MemberPage;