import React, { useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  IconButton,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDemendeBrand } from "../../../data/mockData";
import { mockDemendeUser } from "../../../data/mockData";
import { MyProSidebarProviderF } from "../global/sidebar/sidebarContextF";
import Topbar from "../global/Topbar";
import Header from "../../../components/Header";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dataaff, setDataaff] = useState(mockDemendeUser);
  const [selectedRow, setSelectedRow] = useState(null); // Ligne sélectionnée pour la mise à jour
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // État pour la boîte de dialogue de confirmation
  const [newStatus, setNewStatus] = useState(""); // Nouveau statut sélectionné

  // Fonction pour changer les données affichées
  const changeDat = (data) => {
    if (data === "USER") {
      setDataaff(mockDemendeUser);
    } else if (data === "BRAND") {
      setDataaff(mockDemendeBrand);
    } else {
      setDataaff([]); // Optionnel: vider les données si aucune option valide n'est sélectionnée
    }
  };

  // Fonction pour ouvrir la boîte de dialogue de confirmation
  const handleOpenConfirmDialog = (row, status) => {
    setSelectedRow(row);
    setNewStatus(status);
    setOpenConfirmDialog(true);
  };

  // Fonction pour fermer la boîte de dialogue de confirmation
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedRow(null);
    setNewStatus("");
  };

  // Fonction pour mettre à jour le statut
  const handleUpdateStatus = () => {
    if (selectedRow) {
      const updatedData = dataaff.map((row) =>
        row.id === selectedRow.id ? { ...row, Status: newStatus } : row
      );
      setDataaff(updatedData);
      handleCloseConfirmDialog();
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Nom",
      width: 200,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Téléphone", width: 100 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "cost", headerName: "Coût", width: 100 },
    { field: "RIB", headerName: "RIB", width: 200 },
    { field: "Status", headerName: "Statut", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Select
          sx={{
            backgroundColor: "transparent",
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "0px 20px",
            border: "1px solid transparent",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          }}
          value={params.row.Status || "en cours"} // Valeur par défaut
          onChange={(e) => handleOpenConfirmDialog(params.row, e.target.value)}
        >
          <MenuItem value="accepter">Accepter</MenuItem>
          <MenuItem value="annuler">Annuler</MenuItem>
          <MenuItem value="en cours">En cours de traitement</MenuItem>
          <MenuItem value="reffusé">Refusé</MenuItem>
        </Select>
      ),
    },
  ];

  return (
    <MyProSidebarProviderF>
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Topbar />
          <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Header title="DEMANDE" subtitle="Bienvenue" />
              <Select
                sx={{
                  backgroundColor: "transparent",
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "0px 20px",
                  border: "1px solid transparent",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                }}
                defaultValue="USER"
                onChange={(e) => changeDat(e.target.value)}
              >
                <MenuItem value="USER">UTILISATEUR</MenuItem>
                <MenuItem value="BRAND">MARQUE</MenuItem>
              </Select>
            </Box>
            <Box
              m="8px 0 0 0"
              width="100%"
              height="80vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >
              <DataGrid
                rows={dataaff}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </main>

        {/* Boîte de dialogue de confirmation pour la mise à jour du statut */}
        <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
          <DialogTitle>Confirmer la mise à jour du statut</DialogTitle>
          <DialogContent>
            <Typography>
              Êtes-vous sûr de vouloir mettre à jour le statut de{" "}
              <strong>{selectedRow?.name}</strong> à <strong>{newStatus}</strong> ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} color="secondary">
              Annuler
            </Button>
            <Button onClick={handleUpdateStatus} color="primary">
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MyProSidebarProviderF>
  );
};

export default Contacts;