const express = require("express");
const router = express.Router();
const {
  createNote,
  getAllNotes,
  getNoteById,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.patch("/:id", updateNote);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Notes
 *  description: The notes managing API
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      Note:
 *        type: object
 *        required:
 *            - title
 *        properties:
 *            _id:
 *                type: string
 *                description: The auto-generated id of the note
 *            title:
 *                type: string
 *                description: The title of the note
 *            description:
 *                type: string
 *                description: The description of the note
 *            createdAt:
 *                type: string
 *                description: The date of the note creation
 *            updatedAt:
 *               type: string
 *               description: The date of the note update
 *        example:
 *            title: Note 1
 *            description: This is the first note
 */

/**
 * @swagger
 * /api/notes:
 *     get:
 *      summary: Returns the list of all the notes
 *      tags: [Notes]
 *      parameters:
 *        - in: query
 *          name: direction
 *          schema:
 *              type: enum
 *              enum: [ASC, DESC]
 *
 *          required: false
 *          description: Direction
 *
 *      responses:
 *          200:
 *            description:  Success
 *            content:
 *                application/json:
 *                    schema:
 *                        type: array
 *                        items:
 *                           $ref: '#/components/schemas/Note'
 *
 */

/**
 * @swagger
 * /api/notes:
 *     post:
 *      summary: Create a new note
 *      tags: [Notes]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Note'
 *      responses:
 *        200:
 *          description: The note was successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Note'
 */

/**
 * @swagger
 * /api/notes/{id}:
 *     get:
 *      summary: Get the note by id
 *      tags: [Notes]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           required: true
 *           description: Note id
 *      responses:
 *          200:
 *            description:  Success
 *            content:
 *                application/json:
 *                    schema:
 *                        type: array
 *                        items:
 *                        $ref: '#/components/schemas/Note'
 *
 */
/**
 * @swagger
 * /api/notes{id}:
 *     delete:
 *      summary: Delete the note by id
 *      tags: [Notes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Note id
 *      responses:
 *        200:
 *          description: The note was deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Note'
 *
 */

/**
 * @swagger
 * /api/notes{id}:
 *     patch:
 *      summary: Update the note by id
 *      tags: [Notes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Note id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Note'
 *      responses:
 *        200:
 *          description: The note was successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Note'
 */
