import rfdc from 'rfdc';
const clone = rfdc();

export function getPoseScore(referencePose, newPose) {
  const newPoseNormalised = poseNormalise(newPose);
  const referencePoseNormalised = poseNormalise(referencePose);

  const differences = poseDifference(referencePoseNormalised, newPoseNormalised);
  if (differences != null) {
    const score = poseScore(differences);
    return score
  } else {
    return null
  }
}

function poseNormalise(keypoints) {
  keypoints = keypoints.slice(5)
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = - Infinity;

  for (const keypoint of keypoints) {

    const pos = keypoint.position;
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

  const normalised = keypoints.map((keypoint) => { // Normalise real world coordiants to range 0-100
    // https://stats.stackexchange.com/questions/351696/normalize-an-array-of-numbers-to-specific-range
    const clonedKeypoint = clone(keypoint);
    let initialX = clonedKeypoint.position.x;
    let initialY = clonedKeypoint.position.y;

    // Set min value to 0
    initialX -= minX;
    initialY -= minY;

    // Divide x by width to get value inbetween [0, 1]
    initialX /= (maxX - minX);
    // Divide y by height to get value inbetween [0, 1]
    initialY /= (maxY - minY);

    // Multiply values by new max value
    initialX *= 100;
    initialY *= 100;

    clonedKeypoint.x = initialX;
    clonedKeypoint.y = initialY;

    return clonedKeypoint
  });
  return normalised
}

function poseDifference(from, to) {
  if (from.length != to.length) {
    throw Error("Arrays aren't same length");
  }

  const ret = from.map((val, index) => {
    if (val.score > 0.8) {
      const foo = {
        'xDiff': Math.abs(val.x - to[index].x),
        'yDiff': Math.abs(val.y - to[index].y)
      }
      return foo;
    }
    return null;
  });
  const filtered = ret.filter(val => val != null)
  if (filtered.length < to.length / 2) {
    return null;
  }
  return filtered;
}

function poseScore(differences) {
  let totalDiff =  differences.reduce((acc, cur_val) => {
    acc += cur_val.xDiff;
    acc += cur_val.yDiff;
    return acc
  }, 0)

  totalDiff /= differences.length;
  totalDiff *= 100;
  return totalDiff
}
