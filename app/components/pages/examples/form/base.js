import {Form, Input, Select, Option, Error, SubmitButton, TextArea} from '/components/elements/form'

export default ({onSubmit, validations}) =>
  <Form name='exampleForm' onSubmit={onSubmit} validations={validations}>
    <div>
      <label for='fullName' >Full Name:</label>
      <Input name='fullName' placeholder='Full Name' />
      <Error name='fullName' /><br />
    </div>
    <div>
      <label for='email' >Email:</label>
      <Input name='email' placeholder='Email' type='email' />
      <Error name='email' /><br />
    </div>
    <div>
      <label>Employment:</label>
      <div>
        <Input name='employment' type='radio' value='agent' id='agent' />
        <label for='agent' >Agent</label>
      </div>
      <div>
        <Input name='employment' type='radio' value='secretary' id='secretary' />
        <label for='secretary' >Secretary</label>
      </div>
      <Error name='employment' /><br />
    </div>
    <div>
      <label name='prefs' >Email Preferences:</label>
      <div>
        <Input name='prefs' type='checkbox' value='newFollower' id='newFollower' />
        <label for='newFollower' >New Follower</label>
      </div>
      <div>
        <Input name='prefs' type='checkbox' value='newSeason' id='newSeason' />
        <label for='newSeason' >New Season</label>
      </div>
      <div>
        <Input name='prefs' type='checkbox' value='newDale' id='newDale' />
        <label for='newDale' >New Dale</label>
      </div>
      <Error name='prefs' /><br />
    </div>
    <div>
      <label for='about' >About</label>
      <TextArea name='about' id='about' placeholder='About' />
      <Error name='about' /><br />
    </div>
    <div>
      <label name='bestSeason' >Best Season</label>
      <Select name='bestSeason' >
        <Option value='one'>One</Option>
        <Option value='two'>Two</Option>
        <Option value='three'>Three</Option>
      </Select>
      <Error name='bestSeason' /><br />
    </div>
    <SubmitButton text='Submit' submittingText='Submitting' />
  </Form>
