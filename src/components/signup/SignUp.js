import Form from '../form/Form'
import { Fragment } from "react"
function SignUp({sendUserData ,text}) {
 
  return (
    <Fragment>
       <Form type="signup" sendUserData={sendUserData} text={text}/>
    </Fragment>
  )
}

export default SignUp