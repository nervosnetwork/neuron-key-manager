import React from 'react'
import styled from 'styled-components'
import { Launch } from 'grommet-icons'
import ImportWallet from './importWallet'
import CreateWallet from './createWallet'

const Wizard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  .buttonGroup {
    button {
      height: 40px;
      width: 140px;
      cursor: pointer;
    }
  }
`

export default (props: any) => (
  <Wizard>
    <div style={{ textAlign: 'center' }}>
      <Launch size="large" />
      <h1>Create or import your first wallet</h1>
      <div className="buttonGroup">
        <button
          style={{ float: 'left' }}
          type="button"
          onKeyPress={() => {
            //   for users with physical disabilities who cannot use a mouse
          }}
          onClick={() => {
            props.history.push('/wallets/new')
          }}
        >
          Create New Wallet
        </button>
        <button
          style={{ float: 'right' }}
          type="button"
          onKeyPress={() => {
            //   for users with physical disabilities who cannot use a mouse
          }}
          onClick={() => {
            props.history.push('/wallets/import')
          }}
        >
          Import Wallet
        </button>
      </div>
    </div>
  </Wizard>
)

export { ImportWallet, CreateWallet }
