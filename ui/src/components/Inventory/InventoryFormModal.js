import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import TextField from '../Form/TextField'
import { Field, Form, Formik } from 'formik'


class InventoryFormModal extends React.Component {
  render() {
    const {
      formName,
      handleDialog,
      handleInventory,
      title,
      products
    } = this.props

    return (
      <Dialog
        open={this.props.isDialogOpen}
        maxWidth='sm'
        fullWidth={true}
        onClose={() => { handleDialog(false) }}
      >
        <Formik
          onSubmit={values => {
            handleInventory(values)
            handleDialog(true)
          }}>
          {helpers =>
            <Form
              noValidate
              autoComplete='on'
              id={formName}
            >
              <DialogTitle id='alert-dialog-title'>
                {`${title} Inventory`}
              </DialogTitle>
              <DialogContent>
                <Grid container>
                  <Grid item xs={6} sm={6}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='name'
                      label='Name'
                      component={TextField}
                    />
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Field
                          as='select'
                          name='productType'
                          label='ProductType'
                        >
                          {
                            products.all.map((product, index) =>
                              <option value={product.name} key={index}>{product.name}</option>)
                          }
                        </Field>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { handleDialog(false) } } color='secondary'>Cancel</Button>
                <Button
                  disableElevation
                  variant='contained'
                  type='submit'
                  form={formName}
                  color='secondary'
                  disabled={!helpers.dirty}>Save
                </Button>
              </DialogActions>
            </Form>
          }
        </Formik>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products
})

export default connect(mapStateToProps)(InventoryFormModal)