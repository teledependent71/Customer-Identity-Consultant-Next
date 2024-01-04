import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import authorsPageInitialPropsE3dbdResource from '../../resources/authors-page-initial-props-e3dbd'

const Authors1 = (props) => {
  return (
    <>
      <div className="authors1-container">
        <Head>
          <title>Authors1 - Customer Identity Consultant</title>
          <meta
            property="og:title"
            content="Authors1 - Customer Identity Consultant"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(AuthorsEntities) => (
                  <>
                    <div className="authors1-container1">
                      <h1>{AuthorsEntities?.Name}</h1>
                      <span>{AuthorsEntities?.Name}</span>
                      <span>{AuthorsEntities?.Linkedin}</span>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.authorsEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .authors1-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .authors1-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Authors1.defaultProps = {
  authorsEntities: [],
}

Authors1.propTypes = {
  authorsEntities: PropTypes.array,
}

export default Authors1

export async function getStaticProps(context) {
  try {
    const response = await authorsPageInitialPropsE3dbdResource({
      ...context?.params,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        authorsEntities: response,
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
