import { Col, Grid, Row } from '../theme/components/Grid';
import { Heading } from '../theme/components/Typography';

const cols = new Array(12).fill(undefined).map((_, index) => index + 1);

const GridExample = () => {
  return (
    <>
      <Grid $mt={3}>
        <Row>
          {cols.map(id => (
            <Col colSize={2} key={id}>
              <div>{id}</div>
            </Col>
          ))}
        </Row>
      </Grid>

      <Grid $mt={3}>
        <Row alignContent="middle" reverse={{ from: 'md' }}>
          <Col colSize={{ md: 6, xs: 12 }}>
            <Heading $center>Title</Heading>
          </Col>
          <Col colSize={{ md: 6, xs: 12 }}>
            <img src="https://source.unsplash.com/random" style={{ height: 500, objectFit: 'cover', width: '100%' }} />
          </Col>
        </Row>
      </Grid>
    </>
  );
};

GridExample.propTypes = {};

export default GridExample;
