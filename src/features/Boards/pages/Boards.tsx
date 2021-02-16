import { useQuery } from "@apollo/client";
import { Container, Grid, Typography } from "@material-ui/core";
import { Board, GET_BOARDS } from "../../../graphql/Queries";
import BoardCard from "../components/BoardCard";
import CreateBoardDialog from "../components/CreateBoardForm";

const Boards: React.FC = () => {
  const { loading, error, data } = useQuery(GET_BOARDS);
  if (loading) return <p>loading</p>;
  if (error) return <p>Error! ${error}</p>;
  return (
    <Container>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ marginBottom: 20 }}
      >
        <Grid item>
          <Typography variant="h6" color="initial">
            All Boards
          </Typography>
        </Grid>
        <Grid item>
          <CreateBoardDialog />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {data.boards.map((item: Board) => {
          return (
            <Grid item xs={3}>
              <BoardCard key={item.id} data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Boards;
