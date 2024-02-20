import { z } from "zod"
import { randomUUID } from "node:crypto"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"
import { redis } from "../../lib/redis"

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {
    const voteOnPollParams = z.object({
      pollId: z.string().uuid()
    })

    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid()
    })

    const { pollId } = voteOnPollParams.parse(request.params)
    const { pollOptionId } = voteOnPollBody.parse(request.body)

    let { sessionId } = request.cookies;

    if(sessionId) {
      const existingVote = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId
          }
        }
      })

      if (existingVote && existingVote.pollOptionId !== pollOptionId) {
        await prisma.vote.delete({
          where: {
            id: existingVote.id,
          }
        })

        await redis.zincrby(`poll:${pollId}`, -1, existingVote.pollOptionId)
      } else if (existingVote) {
        return reply.status(400).send({ message: 'You have already voted on this poll option' })
      }
    }

    if (!sessionId) {
      sessionId = randomUUID()
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
      })
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      }
    })

    await redis.zincrby(`poll:${pollId}`, 1, pollOptionId)

    return reply.status(201).send()
  })
}