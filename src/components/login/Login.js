import Form from '../form/Form'
import { Fragment } from "react"
function Login({sendUserData ,text}) {
 
  return (
    <Fragment >
       <Form type="login" sendUserData={sendUserData} text={text}/>
    </Fragment>
  )
}

export default Login