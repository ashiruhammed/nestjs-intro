# Figma Backend Analyzer MCP Server

An MCP (Model Context Protocol) server that analyzes Figma designs and provides intelligent suggestions for backend endpoints and NestJS code generation.

## Features

- 🎨 **Figma Design Analysis**: Automatically analyzes Figma design components
- 🔍 **Smart Pattern Recognition**: Identifies lists, forms, detail views, edit components
- 🚀 **Backend Endpoint Suggestions**: Generates REST API endpoint recommendations
- 💻 **NestJS Code Generation**: Produces ready-to-use controllers, services, and DTOs
- 🧠 **Intelligent Reasoning**: Explains why each endpoint is suggested

## How It Works

1. **Design Analysis**: Fetches Figma design via API and analyzes component structure
2. **Pattern Recognition**: Identifies UI patterns (lists → GET endpoints, forms → POST endpoints, etc.)
3. **Schema Inference**: Analyzes form fields to suggest data schemas
4. **Code Generation**: Creates NestJS boilerplate code based on analysis

## Setup

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Set Figma Token**:

   ```bash
   export FIGMA_TOKEN="your-figma-personal-access-token"
   ```

3. **Build and Run**:
   ```bash
   npm run build
   npm start
   ```

## Usage

### MCP Tools Available

#### `analyze_figma_design`

Analyzes a Figma design file and suggests backend endpoints.

**Parameters:**

- `fileKey`: Figma file key from the URL (e.g., from `https://figma.com/file/ABC123/...`)

**Example Output:**

```
GET /api/users
Description: Get list of users
Reasoning: Detected list component "UserList" - typically needs GET endpoint for data fetching

POST /api/users
Description: Create new user
Reasoning: Detected form component "UserForm" - needs POST endpoint for data submission
```

#### `generate_nestjs_code`

Generates NestJS controller and service code based on analyzed endpoints.

**Parameters:**

- `endpoints`: Array of backend endpoints from analysis

**Example Output:**

```typescript
@Controller('users')
export class UsersController {
  @Get()
  findAllUsers(@Query() query: any) {
    return this.usersService.findAll(query);
  }

  @Post()
  create(@Body() createDto: CreateUserDto) {
    return this.usersService.create(createDto);
  }
}
```

## Recognition Patterns

The analyzer recognizes these UI patterns:

| Pattern            | Triggers                                             | Suggested Endpoint         |
| ------------------ | ---------------------------------------------------- | -------------------------- |
| **List/Grid**      | Names containing "list", "grid", "table", "cards"    | `GET /api/{entity}`        |
| **Forms**          | Names containing "form", "create", "add", "signup"   | `POST /api/{entity}`       |
| **Detail Views**   | Names containing "detail", "profile", "view", "info" | `GET /api/{entity}/:id`    |
| **Edit Forms**     | Names containing "edit", "update", "modify"          | `PUT /api/{entity}/:id`    |
| **Delete Actions** | Names containing "delete", "remove", "trash"         | `DELETE /api/{entity}/:id` |

## Getting Figma File Key

1. Open your Figma design
2. Copy the URL
3. Extract the file key: `https://figma.com/file/[FILE_KEY]/design-name`

## Integration with AI Tools

This MCP server can be integrated with AI assistants like Claude or ChatGPT to provide intelligent design-to-backend analysis workflows.

## Limitations

- Requires proper component naming in Figma for best results
- Analysis is based on naming patterns and component structure
- Generated code serves as a starting point and may need customization

## Contributing

Feel free to contribute by improving pattern recognition, adding new frameworks, or enhancing the analysis logic!
