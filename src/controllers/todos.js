import { getAllTodos, getTodoById } from "../services/database.js";

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo items created
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Todo:
 *        type: object
 *        required:
 *          - id
 *          - name
 *          - description
 *          - category
 *          - duedate
 *          - completed
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *          description:
 *            type: string
 *          category:
 *            type: string
 *          duedate:
 *            type: integer
 *          completed:
 *            type: integer
 *        example:
 *           id: 104
 *           name: "Vacuum the house"
 *           description: "Vacuum the bedrooms, living room and the basement"
 *           category: "House chores"
 *           duedate: 1581768000
 *           completed: 1
 */

/**
 * @swagger
 * path:
 *  /todos:
 *    get:
 *      summary: Get all todos or a single todo by ID
 *      tags: [Todos]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: false
 *          description: Numeric ID of the todo to get
 *      responses:
 *        "200":
 *          description: An array of todos or a todo
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Todo'
 */
async function get(req, res, next) {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);

    if (context.id) {
      await getTodo(res, context.id);
    } else {
      await getTodos(res);
    }
  } catch (err) {
    next(err);
  }
}

async function getTodos(res) {
  const todos = await getAllTodos();
  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(404).end();
  }
}

async function getTodo(res, id) {
  const todo = await getTodoById(id);
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).end();
  }
}

export { get };
