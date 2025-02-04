import type { SVGProps } from 'react'
import type { JSX } from 'react'
import { ToolResponse } from '@/tools/types'
import { ExtractToolOutput, ToolOutputToValueType } from './utils'

export type BlockIcon = (props: SVGProps<SVGSVGElement>) => JSX.Element
export type BlockCategory = 'blocks' | 'tools'

export type PrimitiveValueType = 'string' | 'number' | 'json' | 'boolean' | 'any'
export type ValueType = PrimitiveValueType | Record<string, PrimitiveValueType>

export type BlockOutput = 
  | PrimitiveValueType        
  | { [key: string]: BlockOutput }

export type ParamType = 'string' | 'number' | 'boolean' | 'json'

export type SubBlockType = 'short-input' | 'long-input' | 'dropdown' | 'slider' | 'table' | 'code' | 'switch' | 'tool-input'
export type SubBlockLayout = 'full' | 'half'

export interface ParamConfig {
  type: ParamType
  required: boolean
}

export interface SubBlockConfig {
  id: string
  title: string
  type: SubBlockType
  layout?: SubBlockLayout
  options?: string[]
  min?: number
  max?: number
  columns?: string[]
  placeholder?: string
  password?: boolean
  connectionDroppable?: boolean
  hidden?: boolean
  value?: (params: Record<string, any>) => string
}

export interface BlockConfig<T extends ToolResponse = ToolResponse> {
  type: string
  toolbar: {
    title: string
    description: string
    bgColor: string
    icon: BlockIcon
    category: BlockCategory
  }
  tools: {
    access: string[]
    config?: {
      tool: (params: Record<string, any>) => string
    }
  }
  workflow: {
    subBlocks: SubBlockConfig[]
    inputs: Record<string, ParamConfig>
    outputs: {
      response: {
        type: ToolOutputToValueType<ExtractToolOutput<T>>
      }
    }
  }
}