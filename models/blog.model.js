import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    }
  },
  { timestamps: true }
);


const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters long"],
      maxlength: [150, "Title cannot exceed 150 characters"],
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      index: true
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [20, "Content must be at least 20 characters long"]
    },

    author: {
      type: String,
      trim: true,
      required: true,
      default: "Jet"
      
    },

    category: {
      type: String,
      enum: [
        "technology",
        "health",
        "lifestyle",
        "education",
        "entertainment",
        "business",
        "travel",
        "faith",
        "food",
        "comedy",
        "politics",
        "sports",
        "other"
      ],
      default: "other",
      index: true
    },

    image: {
      url: {
        type: String,
        default: ""
      },
      publicId: {
        type: String,
        default: ""
      }
    },

    tags: {
      type: [String],
      default: [],
      index: true
    },

    published: {
      type: Boolean,
      default: false,
      index: true
    },

    publishedAt: {
      type: Date
    },

    comments: {
    type: [commentSchema],
    default: []
},

    likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
],

  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
// Slug Generation
blogSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  const baseSlug = this.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let slug = baseSlug;
  let count = 1;

  while (await mongoose.models.Blog.exists({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
  next();
});
// Excerpt (preview Text)
blogSchema.virtual("excerpt").get(function () {
  return this.content.length > 150
    ? this.content.substring(0, 100) + "..."
    : this.content;
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;

blogSchema.index({ title: "text", content: "text", tags: "text" });

