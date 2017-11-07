import {pipe} from 'wasmuth'
import {dispatch} from '/store'
import {
  formSet as formSetBuilder,
  formRemove as formRemoveBuilder
} from '../actions.js'
import compose from '/util/compose'
import mapStateToProps from '/util/mapStateToProps'

export default mapStateToProps(
  (state, {name}) => path(['forms', name], state)
)(compose({
    componentWillUnmount () {
      this.formSet = formSetBuilder(this.props.name)
      this.formRemove = formRemoveBuilder(this.props.name)
      !this.props.keepFormDataOnUnmount && dispatch(this.formRemove())
    },
    componentWillUpdate ({
      name,
      initialData,
      validations = {},
      onSubmit
    }) {
      console.log('will update')
    },
    render (props) {
      return BaseForm(props)
    }
      // const formState = pathOr({}, ['forms', formName], getState())
      // if (!formState) { return }
      // if (!formState.initialized) {
      //   dispatch(
      //     formSet(formName, ['initialized'], true),
      //     formSet(formName, ['data'], initialData)
      //   )
      // }

      // if (formState.submit) {
      //   console.log('ABOUT TO SUBMIT')
      //   dispatch(
      //     formSet(formName, ['submit'], false),
      //     formSet(formName, ['submitting'], true)
      //   )
      //   onSubmit(formState.data, onSuccess(formName), onError(formName))
      // }

      // const errors = validate(formState.data || {}, validations)
      // if (!equals(errors, formState.errors)) {
      //   dispatch(
      //     formSet(formName, ['errors'], errors),
      //     formRemove(formName, ['asyncErrors'])
      //   )
      // }
    // },
    // function render ({
      // validations = {},
      // formName,
      // onSubmit,
      // form = {},
      // initialData = {},
      // children,
      // ...props
    // }) {
      // return (
      //   <BaseForm
      //     onSubmit={
      //       ev =>
      //         ev.preventDefault() ||
      //         dispatch(formSet(formName, ['submit'], true))
      //     }
      //     {...props}
      //   >
      //     {addFormNameToChildren(children, formName)}
      //   </BaseForm>
      // )
}))
