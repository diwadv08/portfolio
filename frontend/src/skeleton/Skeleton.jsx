import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Skeleton = () => {
  return (
    <div>
      <Skeleton height={30} width={200} />
      <Skeleton height={20} width={150} />
    </div>
  );
};

export default Skeleton;
