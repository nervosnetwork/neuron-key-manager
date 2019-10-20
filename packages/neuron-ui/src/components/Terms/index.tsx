import React, { useEffect } from 'react'
import {
  Label,
  Pivot,
  PivotItem,
  PivotLinkSize,
  TextField,
  DefaultButton,
  PrimaryButton,
  Stack,
} from 'office-ui-fabric-react'
import { useTranslation } from 'react-i18next'
import { HAS_READ_TERMS } from 'utils/const'

const Terms = ({ setHasReadTerms }: { setHasReadTerms: Function }) => {
  const [t] = useTranslation()
  useEffect(() => {
    document.title = t('terms.title')
    return () => {
      document.title = 'Neuron Key Manager'
    }
  }, [t])

  const onAgree = () => {
    window.localStorage.setItem(HAS_READ_TERMS, 'true')
    if (setHasReadTerms) {
      setHasReadTerms('true')
    }
  }

  const onExit = () => {
    if (window.remote) {
      window.remote.require('electron').app.quit()
    } else {
      window.close()
    }
  }

  return (
    <div>
      <Label required>{t('terms.intro')}</Label>
      <Pivot linkSize={PivotLinkSize.large}>
        {['for-us-residents', 'for-non-us-residents'].map((type: string) => (
          <PivotItem key={type} headerText={t(`terms.${type}.label`)}>
            <TextField
              multiline
              resizable={false}
              value={t(`terms.${type}.terms`)}
              styles={{
                root: {
                  margin: '15px 0',
                },
              }}
            />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 15 }}>
              <DefaultButton text={t(`terms.${type}.exit`)} onClick={onExit} />
              <PrimaryButton text={t(`terms.${type}.agree`)} onClick={onAgree} />
            </Stack>
          </PivotItem>
        ))}
      </Pivot>
    </div>
  )
}

Terms.displayName = 'Terms'

export default Terms
