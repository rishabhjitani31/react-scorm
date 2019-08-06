import {SCORM} from 'pipwerks-scorm-api-wrapper';
let count = 0;
let Scorm = {
  init() {
    SCORM.init();
  },

  getLearnerName() {
    return SCORM.get('cmi.core.student_name');
  },

  submitMCQ(correct, response) {
    let nextIndex = Number(SCORM.get('cmi.interactions._count'));
    SCORM.set("cmi.interactions." + nextIndex + ".id",  "round_" + nextIndex);
    SCORM.set("cmi.interactions." + nextIndex + ".student_response", response);
    SCORM.set("cmi.interactions." + nextIndex + ".result", correct);
    nextIndex++
    SCORM.set('cmi.interactions._count', nextIndex.toString());
    if(correct) {
      count++
      SCORM.set('cmi.core.student_result', count);
    }
},

  finish() {
    console.log('you have finished!');
    let nextIndex = Number(SCORM.get('cmi.interactions._count'));
    let percentage = (count/nextIndex) * 100
  
    SCORM.set('cmi.core.student_percentage', percentage);
    SCORM.set('cmi.core.lesson_status', 'completed');
    console.log('result', SCORM.get('cmi.core.student_result'));
    console.log('percentage', SCORM.get('cmi.core.student_percentage'));
    console.log('scorm', SCORM)
    SCORM.save();
  }
}

export default Scorm;
