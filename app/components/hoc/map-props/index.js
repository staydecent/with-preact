export default mapper => Component => props =>
  <Component {...mapper(props)} />
