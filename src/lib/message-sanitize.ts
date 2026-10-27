import { defaultSchema } from "rehype-sanitize";
import type { Options } from "rehype-sanitize";

const attributes = defaultSchema.attributes ?? {};

/**
 * Sanitizer for user-authored chat HTML.
 *
 * Messages are stored as the HTML the editor produced (mentions, links, code
 * blocks, pasted markup) and rendered with `rehype-raw`, so everything that
 * reaches the sanitizer is attacker-controlled. The schema keeps the markup the
 * composer emits and drops scripts, iframes, event handlers and remote styles.
 */
export const messageSanitizeSchema: Options = {
  ...defaultSchema,
  attributes: {
    ...attributes,
    a: [...(attributes.a ?? []), "target", "rel"],
    code: [...(attributes.code ?? []), "className"],
    pre: [...(attributes.pre ?? []), "className"],
    img: [
      ...(attributes.img ?? []),
      "alt",
      "className",
      "draggable",
      "width",
      "height",
    ],
    span: [
      ...(attributes.span ?? []),
      "className",
      "dataType",
      "dataId",
      "dataLabel",
    ],
    td: [...(attributes.td ?? []), "align"],
    th: [...(attributes.th ?? []), "align"],
  },
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto"],
    src: ["http", "https"],
  },
};
