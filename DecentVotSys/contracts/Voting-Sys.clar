(define-map polls
  (tuple (poll-id uint))
  (tuple
    (creator principal)
    (options (list 20 (tuple (option-name (string-ascii 20)) (votes uint))))
    (total-votes uint)))

(define-public (create-poll (poll-id uint) (options (list 20 (string-ascii 20))))
  (let ((existing-poll (map-get? polls (tuple (poll-id poll-id)))))
    (if (is-some existing-poll)
      (err u1)
      (ok (map-set polls 
          (tuple (poll-id poll-id))
          (tuple
            (creator tx-sender)
            (options (map (lambda (option) (tuple (option-name option) (votes u0))) options))
            (total-votes u0))))))
)

;; Rest of the contract remains the same
(define-public (vote (poll-id uint) (option-name (string-ascii 20)))
  (match (map-get? polls (tuple (poll-id poll-id)))
    poll (match (find-option option-name (get options poll))
      option (let ((new-votes (+ (get votes option) u1)))
        (ok (map-set polls 
          (tuple (poll-id poll-id))
          (merge poll 
            (tuple
              (options (update-option option-name new-votes (get options poll)))
              (total-votes (+ u1 (get total-votes poll))))))))
      (err u3))
    (err u2))
)

(define-read-only (get-results (poll-id uint))
  (match (map-get? polls (tuple (poll-id poll-id)))
    poll (ok (get options poll))
    (err u4))
)

(define-private (find-option (option-name (string-ascii 20)) (options (list 20 (tuple (option-name (string-ascii 20)) (votes uint)))))
  (fold check-option options
    (lambda (option acc)
      (if (is-eq (get option-name option) option-name)
        (ok option)
        acc))
    (err u404))
)

(define-private (check-option (option (tuple (option-name (string-ascii 20)) (votes uint))) (acc (response (tuple (option-name (string-ascii 20)) (votes uint)) uint)))
  (match acc
    found-option acc
    (if (is-eq (get option-name option) option-name)
      (ok option)
      acc)
  )
)

(define-private (update-option (option-name (string-ascii 20)) (new-votes uint) (options (list 20 (tuple (option-name (string-ascii 20)) (votes uint)))))
  (map update-single-option options)
)

(define-private (update-single-option (option (tuple (option-name (string-ascii 20)) (votes uint))))
  (if (is-eq (get option-name option) option-name)
    (merge option (tuple (votes new-votes)))
    option)
)