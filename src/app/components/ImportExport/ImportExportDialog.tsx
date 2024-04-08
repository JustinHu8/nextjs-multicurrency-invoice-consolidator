import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { defaultScenario } from '@/app/constants/demoInvoice';

interface Props {
  isDialogOpen: boolean;
  onClose: () => void;
  onSave: (invoiceList: string) => void;
}

const ImportExportDialog: React.FC<Props> = ({ isDialogOpen, onClose, onSave }) => {
  const [jsonValue, setJsonValue] = useState<string>(JSON.stringify(defaultScenario));

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonValue(event.target.value);
  };

  const handleSaveImportInvoice = () => {
    console.log('JSON Value:', jsonValue);
    onSave(jsonValue);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Import / Export</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={6}
            fullWidth
            placeholder="Invoice JSON here"
            value={jsonValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleSaveImportInvoice} color="primary" variant="contained">
            OK
          </Button>
          <Button onClick={onClose} color="primary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImportExportDialog;