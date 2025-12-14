// import type { z } from "zod"
// type PathKey = string | number
// type UnknownRecord = Record<string, unknown>
//
// export function zodFieldRuleI18n(
//   schema: z.ZodTypeAny,
//   path: readonly PathKey[],
//   t: (key: string) => string
// ) {
//   return (value: unknown): true | string => {
//     const obj = setPath({}, path, value)
//     const result = schema.safeParse(obj)
//
//     if (result.success) return true
//
//     const issue = result.error.issues.find(
//       (i) =>
//         i.path.length === path.length &&
//         i.path.every((p, idx) => p === path[idx])
//     )
//
//     return t(issue?.message || "validation.invalid")
//   }
// }
//
// function setPath(
//   obj: UnknownRecord,
//   path: readonly PathKey[],
//   value: unknown
// ): UnknownRecord {
//   let current: UnknownRecord = obj
//
//   for (let i = 0; i < path.length - 1; i++) {
//     const key = String(path[i])
//
//     if (typeof current[key] !== "object" || current[key] === null) {
//       current[key] = {}
//     }
//
//     current = current[key] as UnknownRecord
//   }
//
//   current[String(path[path.length - 1])] = value
//   return obj
// }
