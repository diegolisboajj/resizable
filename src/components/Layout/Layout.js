import React from 'react'
import { connect } from 'react-redux'

import { getAllArticles, getLayoutParameters, getRowsByIds } from '../../reducers'
import { addNewRow } from '../../actions'
import Row from '../Row'

import './Layout.css'
import '../../grid.scss'

const Layout = ({ data, layoutArticles, layoutParameters, addNewRow, rows }) => (
  <main className={'Layout'}>
    <h1 className={'Layout__title'}>Layout</h1>
    <main>
      {rows.map(row => (
        <Row
          key={row.rowId}
          row={row.rowId}
          parameters={layoutParameters.filter(p => p.row === row.rowId)}
          articles={row.articlesInRow.map(id => layoutArticles.filter(article => article.id === id)[0])}
        />
      ))}
    </main>
    <button className={'Layout__add-row'} onClick={() => addNewRow()}>Add row</button>
  </main>
)


export default connect(
  state => ({
    layoutArticles: getAllArticles(state),
    layoutParameters: getLayoutParameters(state),
    rows: getRowsByIds(state)
  }),
  {
    addNewRow
  }
)(Layout)