import { useState } from 'react'
import { Form } from '@adonisjs/inertia/react'
import { Plus, UsersRound } from 'lucide-react'

import { PageHeader } from '~/components/ui/page-header'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '~/components/ui/dialog'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { InertiaProps } from '~/types'
import { isAdmin } from '~/lib/utils'

import Team from '#models/team'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '~/components/ui/item'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

type TeamsPageProps = InertiaProps & {
  teams: Team[]
}

type CreateTeamDialog = {
  show: boolean
  setShow: (close: boolean) => void
}

const CreateTeamDialog: React.FC<CreateTeamDialog> = ({ show, setShow }) => (
  <Dialog open={show} onOpenChange={setShow}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a team to get started</DialogTitle>
        <DialogDescription>
          Add your teammates and let your API key do the rest — your replays, all in one place
        </DialogDescription>
        <Form route="teams.create" onSubmitComplete={() => setShow(false)}>
          <FieldGroup className="mt-4">
            <Field>
              <FieldLabel htmlFor="teamName">Team name</FieldLabel>
              <Input name="teamName" id="teamName" type="text" placeholder="Team Rocket" required />
            </Field>
            <Field>
              <Button type="submit">Create</Button>
            </Field>
          </FieldGroup>
        </Form>
      </DialogHeader>
    </DialogContent>
  </Dialog>
)

export default function Teams({ teams, user }: TeamsPageProps) {
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false)

  const isEmptyTeams = () => teams.length == 0

  const AddATeamButton: React.FC = () => (
    <Button key="add_a_team_button" onClick={() => setShowCreateTeamDialog(true)}>
      <Plus />
      Add a team
    </Button>
  )

  const EmptyStateTeams: React.FC = () => (
    <Empty className="mt-32">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UsersRound />
        </EmptyMedia>
        <EmptyTitle>No team found</EmptyTitle>
        {isAdmin(user) ? (
          <EmptyDescription>
            Your replays are waiting. Create a team, invite your teammates and start collecting them
            in one place.
          </EmptyDescription>
        ) : (
          <EmptyDescription>You are not currently on any team</EmptyDescription>
        )}
      </EmptyHeader>
      <EmptyContent>{isAdmin(user) && <AddATeamButton />}</EmptyContent>
    </Empty>
  )

  const TeamItem: React.FC<{ team: Team }> = ({ team }) => (
    <Item variant="outline" className="mb-2">
      <ItemContent>
        <ItemTitle>{team.name}</ItemTitle>
      </ItemContent>
      {/*<ItemMedia>
        <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
          <Avatar className="hidden sm:flex">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="hidden sm:flex">
            <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>
      </ItemMedia>*/}
    </Item>
  )

  return (
    <div className="w-full max-w-7xl">
      <PageHeader
        title={isAdmin(user) ? 'Teams' : 'My teams'}
        buttons={!isEmptyTeams() ? [<AddATeamButton />] : []}
      />
      <CreateTeamDialog show={showCreateTeamDialog} setShow={setShowCreateTeamDialog} />
      {isEmptyTeams() ? (
        <EmptyStateTeams />
      ) : (
        teams.map((team) => <TeamItem team={team} key={team.id} />)
      )}
    </div>
  )
}
