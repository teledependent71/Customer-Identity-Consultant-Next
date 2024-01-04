import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Customer Identity Consultant</title>
          <meta
            property="og:title"
            content="test-page - Customer Identity Consultant"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_fpw88d) => (
            <>
              <h1 id={context_fpw88d?.Name}>Heading</h1>
            </>
          )}
          initialData={props.contextFpw88dProp}
          persistDataDuringLoading={true}
          key={props?.contextFpw88dProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextFpw88dProp = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextFpw88dProp: contextFpw88dProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
