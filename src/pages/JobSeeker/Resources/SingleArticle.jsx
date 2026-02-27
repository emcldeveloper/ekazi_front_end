import React, { useState } from "react";
import JobSeekerLayout2 from "../../../layouts/JobSeekerLayout2";
import { Button, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useArticleBySlug, useCreateComment } from "../../../hooks/useArticles";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useCvProfile } from "../../../hooks/useCv";

const SingleArticle = () => {
  const { slug } = useParams();

  const applicantId = localStorage.getItem("applicantId");
  const { data: profile } = useCvProfile(applicantId);

  const firstName = profile?.data?.applicant_profile?.first_name;
  const lastName = profile?.data?.applicant_profile?.last_name;
  const email = profile?.data?.applicant_profile?.email;
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();

  const { data, isPending: isLoading } = useArticleBySlug(slug);
  const article = data?.data;
  const articleId = article?.id;

  const { mutate, isPending } = useCreateComment(articleId);

  const { register, handleSubmit, reset } = useForm();

  const [showCommentForm, setShowCommentForm] = useState(false);

  const isHTML = /<\/?[a-z][\s\S]*>/i.test(article?.content);

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      name: fullName,
      email: email,
    };

    mutate(payload, {
      onSuccess: () => {
        reset();
        setShowCommentForm(false);
      },
    });
  };

  if (isLoading) {
    return (
      <JobSeekerLayout2>
        <Card>
          <Card.Body>Loading...</Card.Body>
        </Card>
      </JobSeekerLayout2>
    );
  }

  return (
    <JobSeekerLayout2>
      <Card>
        <Card.Body>
          <div className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Featured Image */}
            <div className="h-96">
              {article?.featured_image && (
                <img
                  src={article?.featured_image}
                  alt={article?.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-5 flex flex-col">
              {/* Meta */}
              <div className="flex items-center justify-between mb-3">
                <small className="text-gray-500">{article?.published_at}</small>
                <div className="flex items-center gap-2 text-gray-500">
                  <FaEye className="text-[#d36314]" />
                  <small>{article?.views}</small>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-bold text-3xl mb-2 text-[#d36314]">
                {article?.title}
              </h2>

              {/* Content */}
              <div className="prose max-w-none">
                {isHTML ? (
                  <div dangerouslySetInnerHTML={{ __html: article?.content }} />
                ) : (
                  article?.content
                    .split(/\r?\n\r?\n/)
                    .map((paragraph, index) => <p key={index}>{paragraph}</p>)
                )}
              </div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          {/* Comments Card */}
          {showCommentForm ? (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3 w-100">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={5}
                  {...register("comment", { required: true })}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="primary" type="submit" disabled={isPending}>
                  {isPending ? "Submitting..." : "Submit"}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowCommentForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          ) : (
            <Button
              className="outline-primary"
              onClick={() => setShowCommentForm(true)}
            >
              Add Comment
            </Button>
          )}
        </Card.Footer>
      </Card>
    </JobSeekerLayout2>
  );
};

export default SingleArticle;
