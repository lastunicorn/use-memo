# Copilot Instructions

## Code Conventions (React)

Follow these conventions to match the current project style.

### General

- Use TypeScript React function components (no class components).
- Prefer simple, explicit code over abstraction.
- Keep changes small and local to the feature being edited.

### Formatting

- Use tabs for indentation in `.ts`, `.tsx`, and `.css` files.
- Prefer single quotes for strings.
- Prefer using semicolons even if not mandatory by syntax.

### React Components

- Define components as named functions, then `export default` at the end.
- Define props as local `type` aliases named `<ComponentName>Props`.
- Destructure props directly in the function signature.
- Use explicit event types, e.g. `ChangeEvent<HTMLInputElement>`.

### Types

- Use `type` aliases (not `interface`) for object shapes in this project.
- Import types with `import { type X } from '...'`.
- Keep shared domain types in `features/<feature>/types/`.

### File and Folder Patterns

- Organize by feature under `src/features/<feature>/`.
- Keep component files in `components/`, shared feature types in `types/`.
- Use feature `index.ts` files for re-exports.
- Use PascalCase for component/type file names, e.g. `ParentComponent.tsx`, `PersonData.ts`.

### Imports

- Keep imports grouped in this order when practical:
	1) React/external imports
	2) local CSS import
	3) local type imports
	4) local component/module imports
- Use relative imports consistent with surrounding files.

### CSS

- Use plain CSS modules-by-convention (one CSS file per component, imported by that component).
- Use component-scoped class names in PascalCase, e.g. `.PersonEdit`, `.PersonView`.
- Prefer nested selectors scoped under the component root class.
- Keep styling straightforward and readable; avoid adding new styling systems.

### Naming

- Use clear handler names like `handleNameChange`, `handlePersonChange`.
- Use boolean names with `is/has` prefixes, e.g. `isStudent`.
- Use descriptive state/prop names that map directly to UI fields.

### App Structure Expectations

- Keep top-level app composition minimal in `App.tsx`.
- Place feature behavior in feature components instead of `App.tsx`.
- Prefer controlled form inputs for edit components.

