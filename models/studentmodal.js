const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  studentname: {
    type: String,
    required: [true, 'must provide product student name'],
    trim: true,
    unique: true
  },
  batchname: {
    type: String,
    required: [true, 'must provide product batch name'],
    trim: true,
  },
  course: {
    type: String,
    required: [true, 'must provide course name'],
    trim: true,
  },
  emailid: {
    type: String,
    required: [true, 'must provide email id'],
    trim: true,
    unique: true
  },
  contactdetails: {
    type: Number,
    required: [true, 'must provide contact details'],
  },
  address: {
    type: String,
    required: [true, 'must provide address'],
    trim: true,
  },
  referralName: {
    type: String,
    required: [true, 'must provide Referral Name'],
    trim: true,
  },
  totalfees: {
    type: Number,
    required: [true, 'must provide total fees'],
  },

  registration: {
    registrationfees: {
      type: Number,
      required: [true, 'must provide registration fees'],
    },
    registrationDate: {
      type: String,
      required: [false, 'must provide registration Date'],
    },
    registrationPaymentStatus: {
      type: String,
      default: "unpaid"
    }
  },
  secondInstallment: {
    secondInstallmentfees: {
      type: Number,
      required: [true, 'must provide second installment fees'],
    },
    secondInstallmentDate: {
      type: String,
      required: [false, 'must provide second installment fees date'],
    },
    secondInstallmentPaymentStatus: {
      type: String,
      default: "unpaid"
    }
  },
  thirdInstallment: {
    thirdInstallmentfees: {
      type: Number,
      required: [true, 'must provide third installment fees'],
    },
    thirdInstallmentDate: {
      type: String,
      required: [false, 'must provide third installment fees date'],
    },
    thirdInstallmentPaymentStatus: {
      type: String,
      default: "unpaid"
    }
  },

  fourthInstallment: {
    fourthInstallmentfees: {
      type: Number,
      default: 0
    },
    fourthInstallmentDate: {
      type: String,
      default: "NA"
    },
    fourthInstallmentPaymentStatus: {
      type: String,
      default: "NA"
    }
  },
  BalanceAmount: {
    type: Boolean,
    default: false,
  },

  testRecords: [
    {
      testId: {
        type: String,
      },
      testname: {
        type: String,
      },
      category: {
        type: String,
      },
      score: {
        type: Number
      },
      totalMarks: {
        type: Number
      },
      testResponse: [{}]
    }
  ],


  // feedbackRecords: [
  //   {
  //     feedbackId: {
  //       type: String,
  //     },
  //     feedbackname: {
  //       type: String,
  //     },
  //     feedbackcategory: {
  //       type: String,
  //     },
  //     feedbackResponse: [{}]
  //   }
  // ],

  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Student', StudentSchema)