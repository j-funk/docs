// libs
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { ContentBlock } from './Layout.Wrapper'

// non MDX blocks
import HeadingBlock from './HeadingBlock'
import FeedbackBlock from './FeedbackBlock'
import PageInfo from './PageInfo'

// MDX blocks
import CodeBlock from './MDX.CodeBlock'
import InlineCodeBlock from './MDX.InlineCodeBlock'
import AnchorLink from './MDX.AnchorLink'
import ImageBlock from './MDX.ImageBlock'
import NextBlock from './MDX.NextBlock'
import InfoBlock from './MDX.InfoBlock'

const MarkDownContainer = styled.div`
  h3 {
    font-weight: 600;
    font-size: 1.25em;
    margin-top: 2.5em;
    margin-bottom: 0;
  }

  a {
    color: var(--text-blue);
    text-decoration: none;
    border-bottom: 1px solid var(--bg-primary);
    transition: border-bottom 0.25s ease;

    &:hover {
      border-bottom: 1px solid var(--text-blue);
    }
  }

  p {
    font-size: 1em;
    line-height: 1.75em;
  }

  ul,
  ol {
    white-space: normal;
    padding: 0 1em;
  }

  li {
    font-size: 1em;
    line-height: 1.75em;
    margin: 1em 0;
  }

  table {
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    margin-top: 2em;
    width: 100%;
    color: var(--foreground2);
    border-spacing: 0;
  }

  table th,
  table td {
    text-align: left;
    padding: 1em;
    border-bottom: 1px solid var(--border-primary);
  }

  table th {
    border-bottom: 2px solid var(--border-primary);
  }

  table.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid var(--accent);
  }

  table.table tbody + tbody {
    border-top: 2px solid var(--accent);
  }

  table.table thead.thead-dark th {
    background-color: var(--background2);
    border-color: var(--accent);
  }

  table.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

export default function MDXContent({
  title,
  subtitle,
  body,
  lastUpdatedOn,
  slug,
}) {
  useEffect(() => {
    if (typeof hljs !== 'undefined') {
      document.querySelectorAll('pre > code').forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  })

  return (
    <ContentBlock>
      <MarkDownContainer>
        <HeadingBlock title={title} subtitle={subtitle} />
        <MDXProvider
          components={{
            code: CodeBlock,
            inlineCode: InlineCodeBlock,
            img: ImageBlock,
            h2: AnchorLink,
            NextBlock,
            InfoBlock,
          }}
        >
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </MarkDownContainer>
      <FeedbackBlock />
      <PageInfo lastUpdatedOn={lastUpdatedOn} slug={slug}></PageInfo>
    </ContentBlock>
  )
}