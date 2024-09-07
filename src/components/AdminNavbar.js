import styled from "styled-components"

const AdminNavbar=()=>{
    return(
        <Wrapper>
            <nav className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">Admin DashBoard</a>
            </nav>
        </Wrapper>
    )
}
const Wrapper = styled.section`
    .navbar-brand{
        margin-left:2rem;
        color:#6f3780;

    }
`
export default AdminNavbar