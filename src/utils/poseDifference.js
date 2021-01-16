import rfdc from 'rfdc';
const clone = rfdc();

export function poseNormalise(poses) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = - Infinity;
  for (const pose of poses) {
    const pos = pose.position;
    if (pos.x < minX) {
      minX = pos.x;
    }
    if (pos.x > maxX) {
      maxX = pos.x;
    }
    if (pos.y < minY) {
      minY = pos.y;
    }
    if (pos.y > maxY) {
      maxY = pos.y;
    }
  }
  const normalised = poses.map((pose) => {
    const clonedPose = clone(pose);
    clonedPose.x -= minX;
    clonedPose.y -= minY;
    clonedPose.x /= maxX;
    clonedPose.y /= maxY;
    clonedPose.x *= 100;
    clonedPose.y *= 100;
    return clonedPose
  });
  return normalised
}

export function poseDifference(from, to) {
  return []
}

export function poseScore(differences) {

  return 0
}
