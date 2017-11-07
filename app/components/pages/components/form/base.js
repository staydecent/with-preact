import Form from '/components/elements/form/form' 
import TextInput from '/components/elements/form/text-input' 
import Label from '/components/elements/form/label' 
import Error from '/components/elements/form/error' 
import SubmitButton from '/components/elements/form/submit-button' 

export default ({onSubmit, validations}) =>
  <Form name='exampleForm' onSubmit={onSubmit} validations={validations}>
    <Label name='fullName' >Full Name:</Label>
    <TextInput name='fullName' />
    <Error name='fullName' /><br />
    <SubmitButton text='Submit' submittingText='Submitting' />
  </Form>
