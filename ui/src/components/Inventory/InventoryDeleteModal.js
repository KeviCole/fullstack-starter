import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Form, Formik } from 'formik'

class InventoryDeleteModal extends React.Component {
  render() {
    const {
      title,
      handleDialog,
      handleDelete,
      isDialogOpen,
      initialValues
    } = this.props
    return (
      <Dialog
        open={isDialogOpen}
        onClose={() => { handleDialog(false) }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            handleDelete(values)
            handleDialog(true)
          }}
        >
          {helpers =>
            <Form
              id={'deleteInventory'}
              autoComplete='off'
            >
              <DialogTitle id='alert-dialog-title'>
                {`${title} Inventory`}
              </DialogTitle>
              <DialogContent>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography>
                      Are you sure you would like to delete this Inventory item?
                    </Typography>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { handleDialog(false) }} color='secondary'>No</Button>
                <Button
                  disableElevation
                  variant='contained'
                  type='submit'
                  form='deleteInventory'
                  color='secondary'
                >Yes
                </Button>
              </DialogActions>
            </Form>
          }
        </Formik>
      </Dialog>
    )
  }
}

InventoryDeleteModal.defaultProps = {
  delete: {}
}

export default InventoryDeleteModal