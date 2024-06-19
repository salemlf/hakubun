import { createFileRoute, redirect } from "@tanstack/react-router";
import { SubjectDetails } from "../pages/SubjectDetails";

export const Route = createFileRoute("/_auth/subjects/$subjId")({
  component: SubjDetailsComponent,
  // TODO: redirect to the previous page if cannot parse the ID
  parseParams: (params) => {
    const parsedID = parseInt(params.subjId);
    if (!parsedID) throw Error(`${params.subjId} is not a valid subject ID.`);
    return { subjId: parsedID };
  },

  // TODO: actually load the data
  loader: ({ params: { subjId } }) => subjId,
});

function SubjDetailsComponent() {
  const subjId = Route.useLoaderData();
  return <SubjectDetails subjId={subjId} />;
}
