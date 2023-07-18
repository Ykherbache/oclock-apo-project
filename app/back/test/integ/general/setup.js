import Docker from 'dockerode';

const MYSQL_IMAGE = 'mysql:8.0.33';
export const MYSQL_CONTAINER_NAME = 'mysql-test';

const docker = new Docker();

async function pullMysqlImage() {
  const images = await docker.listImages({
    filters: JSON.stringify({ reference: [MYSQL_IMAGE] }),
  });
  if (images.length === 0) {
    await docker.pull(MYSQL_IMAGE);
  }
}
