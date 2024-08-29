(define-map polls
  (tuple (poll-id uint))
  (tuple
    (creator principal)
    (options (list 20 (tuple (option-name (string-ascii 20)) (votes uint))))
    (total-votes uint)))

(define-public (create-poll (poll-id uint) (options (list 20 (string-ascii 20))))
  (begin
    (asserts! (not (map-get? polls (tuple (poll-id poll-id)))) "Poll already exists.")
    (let ((option-tuples (map (lambda (option) (tuple (option-name option) (votes 0))) options)))
      (map-set polls (tuple (poll-id poll-id))
        (tuple
          (creator (as-principal (get-caller)))
          (options option-tuples)
          (total-votes 0)))
    )
  )
)

(define-public (vote (poll-id uint) (option-name (string-ascii 20)))
  (begin
    (let ((poll (map-get? polls (tuple (poll-id poll-id)))))
      (asserts! (is-ok poll) "Poll does not exist.")
      (let ((options (get (options (unwrap-panic poll)))))
        (let ((option (find-option option-name options)))
          (asserts! (is-ok option) "Option does not exist.")
          (let ((new-votes (+ (get (votes (unwrap-panic option))) 1)))
            (let ((updated-options (update-option option-name new-votes options)))
              (map-set polls (tuple (poll-id poll-id))
                (tuple
                  (creator (get (creator (unwrap-panic poll))))
                  (options updated-options)
                  (total-votes (+ 1 (get (total-votes (unwrap-panic poll))))))))))
        )
      )
    )
  )
)

(define-public (get-results (poll-id uint))
  (let ((poll (map-get? polls (tuple (poll-id poll-id)))))
    (asserts! (is-ok poll) "Poll does not exist.")
    (get (options (unwrap-panic poll)))
  )
)

(define-private (find-option (option-name (string-ascii 20)) (options (list 20 (tuple (option-name (string-ascii 20)) (votes uint)))))
  (fold option options
    (lambda (option acc)
      (if (is-eq (get (option-name option) option) option-name)
        (ok option)
        acc))
    (err "Option not found"))
)

(define-private (update-option (option-name (string-ascii 20)) (new-votes uint) (options (list 20 (tuple (option-name (string-ascii 20)) (votes uint)))))
  (map options
    (lambda (option)
      (if (is-eq (get (option-name option) option) option-name)
        (tuple (option-name option-name) (votes new-votes))
        option)))
)