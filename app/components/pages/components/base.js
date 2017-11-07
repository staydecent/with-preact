import ProgressExample from './progress'
import ExampleForm from './form'

export default ({openExampleModal}) =>
  <div>
    <h1>Modals</h1>
    <button onClick={openExampleModal}>Open Modal</button>
    <hr />
    <h1>Dropdown</h1>
    <hr />
    <h1>Progress</h1>
    <ProgressExample />
    <hr />
    <h1>Form</h1>
    <ExampleForm />
  </div>
