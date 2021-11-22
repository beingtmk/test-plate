// import 'katex/dist/katex.min.css'
// import { InlineMath, BlockMath } from 'react-katex'

import 'tippy.js/dist/tippy.css'
import './index.css'
import ReactDOM from 'react-dom'
import React, { useMemo, useState, useCallback } from 'react'
import {
  createPlateComponents,
  createPlateOptions,
  HeadingToolbar,
  MentionCombobox,
  PlatePlugin,
  Plate,
  SearchHighlightToolbar,
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createHistoryPlugin,
  createKbdPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createReactPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createDndPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  createDeserializeHTMLPlugin,
  createComboboxPlugin,
  createMentionPlugin,
  useFindReplacePlugin,
  createIndentPlugin,
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createDeserializeMDPlugin,
  createDeserializeCSVPlugin,
  createDeserializeAstPlugin,
  createNormalizeTypesPlugin,
  createFontSizePlugin,
  createHorizontalRulePlugin,
  getRenderElement,
} from '@udecode/plate'
import {
  createExcalidrawPlugin,
  ELEMENT_EXCALIDRAW,
  ExcalidrawElement,
} from '@udecode/plate-excalidraw'
import { MarkBallonToolbar, ToolbarButtons } from './config/components/Toolbars'
import { withStyledPlaceHolders } from './config/components/withStyledPlaceHolders'
import { withStyledDraggables } from './config/components/withStyledDraggables'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Search } from '@styled-icons/material/Search'
import { MENTIONABLES } from './config/mentionables'
import { CONFIG } from './config/config'
import { VALUES } from './config/values/values'

const id = 'Examples/Playground'

var Latex = require('react-latex')

const latexElement = (props: any) => {
  // console.log()

  return (
    <>
      <Latex displayMode={true}>{props.element.children[0].text}</Latex>
    </>
  )
}

let components = createPlateComponents({
  ['latex']: latexElement,
  // customize your components by plugin key
})
components = withStyledPlaceHolders(components)
components = withStyledDraggables(components)

const options = createPlateOptions({
  // customize your options by plugin key
})

const ELEMENT_LATEX = 'latex'
export const createLatexPlugin = (): PlatePlugin => ({
  // onKeyDown: getToggleElementOnKeyDown(ELEMENT_LATEX),
  pluginKeys: ELEMENT_LATEX,
  renderElement: getRenderElement(ELEMENT_LATEX),
})

const Plugins = () => {
  const { setSearch, plugin: searchHighlightPlugin } = useFindReplacePlugin()

  const pluginsMemo: PlatePlugin[] = useMemo(() => {
    const plugins = [
      createReactPlugin(),
      createHistoryPlugin(),
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createTodoListPlugin(),
      createHeadingPlugin(),
      createImagePlugin(),
      createHorizontalRulePlugin(),
      createLinkPlugin(),
      createListPlugin(),
      createTablePlugin(),
      createMediaEmbedPlugin(),
      createExcalidrawPlugin(),
      createCodeBlockPlugin(),
      createAlignPlugin(CONFIG.align),
      createBoldPlugin(),
      createCodePlugin(),
      createItalicPlugin(),
      createHighlightPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createFontColorPlugin(),
      createFontBackgroundColorPlugin(),
      createFontSizePlugin(),
      createKbdPlugin(),
      createNodeIdPlugin(),
      createDndPlugin(),
      createIndentPlugin(CONFIG.indent),
      createAutoformatPlugin(CONFIG.autoformat),
      createResetNodePlugin(CONFIG.resetBlockType),
      createSoftBreakPlugin(CONFIG.softBreak),
      createExitBreakPlugin(CONFIG.exitBreak),
      createNormalizeTypesPlugin(CONFIG.forceLayout),
      createTrailingBlockPlugin(CONFIG.trailingBlock),
      createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
      createComboboxPlugin(),
      createMentionPlugin({ trigger: '/' }),
      createLatexPlugin(),
      searchHighlightPlugin,
    ]

    plugins.push(
      ...[
        createDeserializeMDPlugin({ plugins }),
        createDeserializeCSVPlugin({ plugins }),
        createDeserializeHTMLPlugin({ plugins }),
        createDeserializeAstPlugin({ plugins }),
      ]
    )

    return plugins
  }, [searchHighlightPlugin])

  const [debugValue, setDebugValue] = useState(null)

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        id={id}
        plugins={pluginsMemo}
        components={components}
        options={options}
        editableProps={CONFIG.editableProps}
        initialValue={VALUES.playground}
        onChange={(newValue: any) => {
          setDebugValue(newValue)
          console.log(newValue)
          // save newValue...
        }}
      >
        {/* <SearchHighlightToolbar icon={Search} setSearch={setSearch} /> */}
        <HeadingToolbar>
          <ToolbarButtons />
        </HeadingToolbar>

        <MarkBallonToolbar />

        <MentionCombobox items={MENTIONABLES} />
      </Plate>
    </DndProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Plugins />, rootElement)
