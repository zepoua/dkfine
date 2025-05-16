import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { useUser } from '../../contexts/UserContext';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: 'contain',
  },
  headerDetails: {
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d6efd',
    marginBottom: 4,
  },
  subText: {
    fontSize: 10,
    color: '#333',
  },
  titleBox: {
    backgroundColor: '#0d6efd',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  titleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0d6efd',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0d6efd',
    borderBottomStyle: 'solid',
    paddingBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    width: '45%',
    fontWeight: 'bold',
    color: '#333',
  },
  infoValue: {
    width: '50%',
    textAlign: 'right',
    color: '#555',
  },
});

const RecuPDF = ({ compte, microfinance }) => {
console.log(microfinance);

  return (
    <Document>
      <Page style={styles.page}>
        {/* Microfinance Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            {microfinance?.logo && (
              <Image style={styles.logo} src={microfinance.logo} />
            )}
            <View style={styles.headerDetails}>
              <Text style={styles.headerText}>{microfinance?.nom || 'Microfinance'}</Text>
              <Text style={styles.subText}>{microfinance?.adresse || 'Adresse inconnue'}</Text>
              <Text style={styles.subText}>Tél : {microfinance?.telephone || '-'}</Text>
              <Text style={styles.subText}>Autorisation : {microfinance?.autorisation || '-'}</Text>
            </View>
          </View>

          <View style={styles.titleBox}>
            <Text style={styles.titleText}>Reçu de Compte</Text>
          </View>
        </View>

        {/* Compte Info */}
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Informations du Compte</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>N° Compte :</Text>
            <Text style={styles.infoValue}>{compte.numero_compte}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Type :</Text>
            <Text style={styles.infoValue}>{compte.type_compte}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Solde :</Text>
            <Text style={styles.infoValue}>{compte.solde} FCFA</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Part Sociale :</Text>
            <Text style={styles.infoValue}>{compte.part_social} FCFA</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Part Minimale :</Text>
            <Text style={styles.infoValue}>{compte.part_minimal} FCFA</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Membre :</Text>
            <Text style={styles.infoValue}>{compte.membre?.nom || '—'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Utilisateur :</Text>
            <Text style={styles.infoValue}>{compte.user?.nom || '—'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>État :</Text>
            <Text style={styles.infoValue}>{compte.etat || '—'}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RecuPDF;
