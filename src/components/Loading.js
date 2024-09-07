import React from 'react'
import styled from 'styled-components'

const Loading = () => {
  return (
    <Wrapper>
        <div className='section secton-center'>
            <div className='loading'></div>
        </div>
    </Wrapper>
  )
}
const Wrapper = styled.article`
.section {
  padding: 5rem 0;
}
.section-center {
  width: 90vw;
  margin: 0 auto;
  max-width: var(--max-width);
}
`

export default Loading