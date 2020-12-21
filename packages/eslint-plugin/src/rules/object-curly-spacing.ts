import { TSESTree } from '@typescript-eslint/experimental-utils';
import baseRule from 'eslint/lib/rules/object-curly-spacing';
import {
  createRule,
  InferMessageIdsTypeFromRule,
  InferOptionsTypeFromRule,
} from '../util';

export type Options = InferOptionsTypeFromRule<typeof baseRule>;
export type MessageIds = InferMessageIdsTypeFromRule<typeof baseRule>;

export default createRule<Options, MessageIds>({
  name: 'object-curly-spacing',
  meta: {
    ...baseRule.meta,
    docs: {
      description: 'Enforce consistent spacing inside braces',
      category: 'Stylistic Issues',
      recommended: false,
      extendsBaseRule: true,
    },
  },
  defaultOptions: ['never'],
  create(context) {
    const rules = baseRule.create(context);
    return {
      ...rules,
      TSTypeLiteral(node: TSESTree.TSTypeLiteral): void {
        rules.ObjectExpression({
          ...node,
          properties: node.members,
        } as any);
      },
    };
  },
});
